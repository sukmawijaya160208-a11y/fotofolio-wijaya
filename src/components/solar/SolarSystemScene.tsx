import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Billboard, Html, Line, OrbitControls, useProgress, useTexture } from "@react-three/drei";
import * as THREE from "three";
import {
  EARTH_CLOUDS_TEXTURE,
  EARTH_NIGHT_TEXTURE,
  MILKY_WAY_TEXTURE,
  OBSERVATORY,
  SATURN_RING_TEXTURE,
  SUN_TEXTURE,
  celestialBodies,
  type CelestialBody,
} from "../../data/solarSystem";
import { LIME, type SolarQuality } from "./solarTheme";

type Quality = SolarQuality;
type Registry = Map<string, THREE.Object3D>;
/** Shared drive state: user orbiting + intro dolly. */
type Drive = { user: boolean; intro: boolean };
type Controls = { enabled: boolean; target: THREE.Vector3 } | null;

function useGlowTexture() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 256;
    const g = c.getContext("2d")!;
    const grad = g.createRadialGradient(128, 128, 0, 128, 128, 128);
    grad.addColorStop(0, "rgba(255,240,200,0.85)");
    grad.addColorStop(0.25, "rgba(245,200,105,0.4)");
    grad.addColorStop(0.55, "rgba(210,150,60,0.12)");
    grad.addColorStop(1, "rgba(210,150,60,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, 256, 256);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);
}

const ORIGIN = new THREE.Vector3(0, 0, 0);

function CameraRig({
  reduce,
  selectedId,
  bodies,
  selectedRadius,
  drive,
  controls,
}: {
  reduce: boolean;
  selectedId: string | null;
  bodies: React.MutableRefObject<Registry>;
  selectedRadius: number;
  drive: React.MutableRefObject<Drive>;
  controls: React.MutableRefObject<Controls>;
}) {
  const { camera } = useThree();
  const look = useRef(new THREE.Vector3(0, 0, 0));
  const tmpCam = useRef(new THREE.Vector3());
  const tmpWorld = useRef(new THREE.Vector3());
  const tmpDir = useRef(new THREE.Vector3());
  const weight = useRef(0);

  // Fixed cinematic overview.
  const BASE = useMemo(
    () => new THREE.Vector3(Math.sin(0.3) * 10.5, 0.5, Math.cos(0.3) * 10.5),
    [],
  );

  useFrame(() => {
    const ctl = controls.current;
    const wantFocus = !reduce && selectedId ? 1 : 0;
    weight.current += (wantFocus - weight.current) * 0.045;
    const transitioning = weight.current > 0.02 && weight.current < 0.98;

    if (!drive.current.intro) {
      // Intro dolly: far → overview, then hand over to the user.
      tmpCam.current.copy(BASE);
      camera.position.lerp(tmpCam.current, 0.035);
      look.current.lerp(ORIGIN, 0.06);
      camera.lookAt(look.current);
      if (ctl) ctl.enabled = false;
      if (camera.position.distanceTo(BASE) < 0.3) drive.current.intro = true;
      return;
    }

    let focusPos: THREE.Vector3 | null = null;
    if ((transitioning || weight.current >= 0.98) && selectedId) {
      const obj = bodies.current.get(selectedId);
      if (obj) {
        obj.getWorldPosition(tmpWorld.current);
        focusPos = tmpWorld.current;
        tmpDir.current.copy(tmpWorld.current).setY(0);
        if (tmpDir.current.lengthSq() < 1e-4) tmpDir.current.set(0, 0, 1);
        tmpDir.current.normalize();
        const dist = selectedRadius * 8 + 1.5;
        tmpCam.current.copy(tmpWorld.current).addScaledVector(tmpDir.current, dist);
        tmpCam.current.y += dist * 0.32;
      }
    }

    if (transitioning || !drive.current.user) {
      // Dolly (or untouched overview): rig owns the camera.
      if (!focusPos) tmpCam.current.copy(BASE);
      camera.position.lerp(tmpCam.current, 0.06);
      if (ctl) ctl.enabled = false;
    } else if (ctl) {
      ctl.enabled = true;
    }

    if (focusPos) {
      look.current.lerp(focusPos, 0.08 + weight.current * 0.02);
      if (ctl && !transitioning) ctl.target.lerp(focusPos, 0.25);
    } else {
      look.current.lerp(ORIGIN, 0.06);
      if (ctl && !transitioning) ctl.target.lerp(ORIGIN, 0.1);
    }
    camera.lookAt(look.current);
  });
  return null;
}

function Sun({
  bodies,
  reduce,
}: {
  bodies: React.MutableRefObject<Registry>;
  reduce: boolean;
}) {
  const tex = useTexture(SUN_TEXTURE);
  const glow = useGlowTexture();
  const mesh = useRef<THREE.Mesh>(null);
  const sprite = useRef<THREE.Sprite>(null);
  useMemo(() => {
    tex.colorSpace = THREE.SRGBColorSpace;
  }, [tex]);
  useEffect(() => {
    if (mesh.current) bodies.current.set("sun", mesh.current);
    return () => {
      bodies.current.delete("sun");
    };
  }, [bodies]);

  useFrame((state) => {
    if (mesh.current && !reduce) mesh.current.rotation.y += 0.0006;
    if (sprite.current && !reduce) {
      const s = 5.2 + Math.sin(state.clock.elapsedTime * 0.7) * 0.2;
      sprite.current.scale.set(s, s, 1);
    }
  });

  return (
    <group>
      <mesh ref={mesh}>
        <sphereGeometry args={[0.72, 48, 32]} />
        <meshBasicMaterial map={tex} toneMapped={false} />
      </mesh>
      <sprite ref={sprite} scale={[5.2, 5.2, 1]}>
        <spriteMaterial map={glow} transparent blending={THREE.AdditiveBlending} depthWrite={false} opacity={0.85} />
      </sprite>
      <pointLight color="#fff0d0" intensity={5} distance={36} decay={1.4} />
      <Html center position={[0, -1.05, 0]} className="pointer-events-none select-none">
        <span className="whitespace-nowrap font-mono text-[8.5px] tracking-[0.28em] text-[#F3F5F7]/50">
          {OBSERVATORY.system}
        </span>
      </Html>
    </group>
  );
}

function Ring({ tex, size }: { tex: THREE.Texture; size: number }) {
  const geo = useMemo(() => {
    const inner = size * 1.35;
    const outer = size * 2.2;
    const g = new THREE.RingGeometry(inner, outer, 96, 1);
    const pos = g.attributes.position;
    const uv = g.attributes.uv;
    const v = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      uv.setXY(i, (v.length() - inner) / (outer - inner), 1);
    }
    return g;
  }, [size]);
  return (
    <mesh geometry={geo} rotation={[-Math.PI / 2, 0, 0]}>
      <meshBasicMaterial map={tex} transparent side={THREE.DoubleSide} depthWrite={false} opacity={0.95} />
    </mesh>
  );
}

function Planet({
  body,
  reduce,
  quality,
  bodies,
  selected,
  dimmed,
  onSelect,
}: {
  body: CelestialBody;
  reduce: boolean;
  quality: Quality;
  bodies: React.MutableRefObject<Registry>;
  selected: boolean;
  dimmed: boolean;
  onSelect: (id: string | null) => void;
}) {
  const tex = useTexture(body.texture);
  const cloudsTex = useTexture(body.clouds ? EARTH_CLOUDS_TEXTURE : body.texture);
  const ringTex = useTexture(body.ring ? SATURN_RING_TEXTURE : body.texture);
  const nightTex = useTexture(body.id === "earth" ? EARTH_NIGHT_TEXTURE : body.texture);
  const swing = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.Mesh>(null);
  const anchor = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const touch = useMemo(
    () => typeof window !== "undefined" && window.innerWidth < 768 && "ontouchstart" in window,
    [],
  );
  const scaleMul = touch ? 1.3 : 1;
  const size = body.radius * scaleMul;
  const seg: [number, number] = quality === "low" ? [18, 12] : [36, 24];

  useMemo(() => {
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
  }, [tex]);

  useEffect(() => {
    if (anchor.current) bodies.current.set(body.id, anchor.current);
    return () => {
      bodies.current.delete(body.id);
    };
  }, [bodies, body.id]);

  useFrame((_, dt) => {
    if (swing.current && !reduce) swing.current.rotation.y += dt * body.orbitSpeed;
    if (spin.current && !reduce) spin.current.rotation.y += dt * body.rotationSpeed;
    if (mesh.current) {
      const t = hovered || selected ? 1.12 : 1;
      const s = mesh.current.scale;
      s.x += (t - s.x) * 0.12;
      s.y = s.z = s.x;
    }
  });

  const tilt = THREE.MathUtils.degToRad(body.tilt ?? 0);

  return (
    <>
      <Line
        points={useMemo(() => {
          const pts: [number, number, number][] = [];
          for (let i = 0; i <= 90; i++) {
            const a = (i / 90) * Math.PI * 2;
            pts.push([Math.cos(a) * body.orbitRadius, 0, Math.sin(a) * body.orbitRadius]);
          }
          return pts;
        }, [body.orbitRadius])}
        color="#4C555F"
        lineWidth={1}
        transparent
        opacity={dimmed ? 0.07 : 0.16}
      />
      <group ref={swing}>
        <group
          ref={anchor}
          position={[body.orbitRadius, 0, 0]}
        >
          <group rotation={[0, 0, tilt]}>
            <group ref={spin}>
              <mesh
                ref={mesh}
                onPointerOver={(e) => {
                  e.stopPropagation();
                  setHovered(true);
                  document.body.style.cursor = "pointer";
                }}
                onPointerOut={() => {
                  setHovered(false);
                  document.body.style.cursor = "auto";
                }}
                onPointerDown={(e) => {
                  e.stopPropagation();
                  onSelect(selected ? null : body.id);
                }}
              >
                <sphereGeometry args={[size, seg[0], seg[1]]} />
                <meshStandardMaterial
                  map={tex}
                  color={dimmed ? "#5a6068" : "#ffffff"}
                  roughness={0.92}
                  metalness={0.04}
                  emissiveMap={body.id === "earth" ? nightTex : undefined}
                  emissive={body.id === "earth" ? "#fff2c8" : "#000000"}
                  emissiveIntensity={body.id === "earth" ? 1.15 : 0}
                />
              </mesh>
              {body.clouds && (
                <mesh>
                  <sphereGeometry args={[size * 1.022, seg[0], seg[1]]} />
                  <meshStandardMaterial map={cloudsTex} transparent depthWrite={false} roughness={1} metalness={0} />
                </mesh>
              )}
              {body.id === "earth" && (
                <mesh scale={1.07}>
                  <sphereGeometry args={[size, seg[0], seg[1]]} />
                  <meshBasicMaterial color="#6fa8dc" transparent opacity={0.1} side={THREE.BackSide} blending={THREE.AdditiveBlending} depthWrite={false} />
                </mesh>
              )}
              {body.ring && <Ring tex={ringTex} size={size} />}
            </group>
          </group>
          {selected && (
            <Billboard position={[0, 0, 0]}>
              <mesh>
                <ringGeometry args={[size * 1.5, size * 1.58, 48]} />
                <meshBasicMaterial color={LIME} transparent opacity={0.9} side={THREE.DoubleSide} depthWrite={false} />
              </mesh>
            </Billboard>
          )}
          <Html
            position={[0, size + (body.ring ? size * 1.4 : 0.42), 0]}
            center
            className="pointer-events-none select-none"
            style={{ opacity: hovered || selected ? 1 : 0.55, transition: "opacity .25s" }}
          >
            <span className="whitespace-nowrap text-center">
              <span
                className="block font-mono text-[9px] tracking-[0.2em]"
                style={{ color: selected ? LIME : hovered ? "#F3F5F7" : "rgba(197,203,210,0.75)" }}
              >
                {body.name}
              </span>
              {(hovered || selected) && (
                <span className="block font-mono text-[7.5px] tracking-[0.24em] text-[#78818B]">
                  TARGET — CLICK TO FOCUS
                </span>
              )}
            </span>
          </Html>
        </group>
      </group>
    </>
  );
}

function StarField({ count, reduce }: { count: number; reduce: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 18 + Math.random() * 12;
      const a = Math.random() * Math.PI * 2;
      const b = (Math.random() - 0.5) * Math.PI * 0.7;
      arr[i * 3] = Math.cos(a) * Math.cos(b) * r;
      arr[i * 3 + 1] = Math.sin(b) * r * 0.6;
      arr[i * 3 + 2] = Math.sin(a) * Math.cos(b) * r;
    }
    return arr;
  }, [count]);

  useFrame((_, dt) => {
    if (ref.current && !reduce) ref.current.rotation.y += dt * 0.006;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#F3F5F7" transparent opacity={0.5} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function MilkyWay({ reduce }: { reduce: boolean }) {
  const tex = useTexture(MILKY_WAY_TEXTURE);
  const ref = useRef<THREE.Mesh>(null);
  useMemo(() => {
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
  }, [tex]);
  useFrame((_, dt) => {
    if (ref.current && !reduce) ref.current.rotation.y += dt * 0.004;
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[150, 48, 32]} />
      <meshBasicMaterial map={tex} side={THREE.BackSide} toneMapped={false} color="#8f8f8f" depthWrite={false} />
    </mesh>
  );
}

function TrackProgress({ onProgress }: { onProgress: (pct: number, active: boolean) => void }) {
  const { progress, active } = useProgress();
  const last = useRef(-1);
  useEffect(() => {
    const p = Math.floor(progress);
    if (p !== last.current || !active) {
      last.current = p;
      onProgress(p, active);
    }
  }, [progress, active, onProgress]);
  return null;
}

function Scene({
  reduce,
  quality,
  selectedId,
  onSelect,
  onLoad,
}: {
  reduce: boolean;
  quality: Quality;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onLoad: (pct: number, active: boolean) => void;
}) {
  const bodies = useRef<Registry>(new Map());
  const drive = useRef<Drive>({ user: false, intro: false });
  const controls = useRef<Controls>(null);
  const selectedRadius =
    selectedId === "sun"
      ? 0.72
      : (celestialBodies.find((b) => b.id === selectedId)?.radius ?? 0.4);

  return (
    <>
      <TrackProgress onProgress={onLoad} />
      <ambientLight intensity={0.14} />
      <hemisphereLight args={["#24313d", "#0a0e12", 0.3]} />
      <directionalLight position={[6, 8, 4]} intensity={0.22} color="#8fa3b0" />
      <OrbitControls
        ref={controls as never}
        makeDefault
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.55}
        zoomSpeed={0.8}
        minDistance={2.2}
        maxDistance={34}
        onStart={() => {
          drive.current.user = true;
          drive.current.intro = true;
        }}
      />
      <CameraRig reduce={reduce} selectedId={selectedId} bodies={bodies} selectedRadius={selectedRadius} drive={drive} controls={controls} />
      <MilkyWay reduce={reduce} />
      <Sun bodies={bodies} reduce={reduce} />
      {celestialBodies.map((b) => (
        <Planet
          key={b.id}
          body={b}
          reduce={reduce}
          quality={quality}
          bodies={bodies}
          selected={selectedId === b.id}
          dimmed={!!selectedId && selectedId !== b.id}
          onSelect={onSelect}
        />
      ))}
      <StarField count={quality === "low" ? 24 : 64} reduce={reduce} />
    </>
  );
}

export function SolarSystemCanvas({
  reduce,
  quality,
  selectedId,
  onSelect,
  onLoad,
}: {
  reduce: boolean;
  quality: Quality;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onLoad: (pct: number, active: boolean) => void;
}) {
  return (
    <Canvas
      className="absolute inset-0"
      dpr={quality === "low" ? 1 : [1, 2]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 3, 30], fov: 50, near: 0.1, far: 400 }}
      onPointerMissed={() => onSelect(null)}
    >
      <Suspense fallback={null}>
        <Scene reduce={reduce} quality={quality} selectedId={selectedId} onSelect={onSelect} onLoad={onLoad} />
      </Suspense>
    </Canvas>
  );
}
