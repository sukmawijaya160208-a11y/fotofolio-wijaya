import { Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, Line, useTexture } from "@react-three/drei";
import * as THREE from "three";
import {
  universeNodes,
  universeOrbits,
  type PlanetBody,
  type UniverseNode,
} from "../../data/universe";

const P = (f: string) => `/assets/planets/${f}`;
const TEX_URLS = {
  sun: P("sunmap.jpg"),
  mercury: P("mercurymap.jpg"),
  venus: P("venusmap.jpg"),
  earth: P("earthmap1k.jpg"),
  clouds: P("earthcloudmaptrans.jpg"),
  mars: P("marsmap1k.jpg"),
  jupiter: P("jupitermap.jpg"),
  saturn: P("saturnmap.jpg"),
  ring: P("saturnringcolor.jpg"),
  moon: P("moonmap1k.jpg"),
  neptune: P("neptunemap.jpg"),
  uranus: P("uranusmap.jpg"),
  pluto: P("plutomap1k.jpg"),
} as const;

type Quality = "low" | "high";
type TexMap = Record<keyof typeof TEX_URLS, THREE.Texture> & { ice: THREE.Texture };

function usePlanetTextures(): TexMap {
  const urls = useMemo(() => Object.values(TEX_URLS), []);
  const loaded = useTexture(urls) as THREE.Texture[];
  const ice = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 256;
    c.height = 128;
    const g = c.getContext("2d")!;
    g.fillStyle = "#a9c3d4";
    g.fillRect(0, 0, 256, 128);
    for (let i = 0; i < 900; i++) {
      const v = 150 + Math.floor(Math.random() * 90);
      g.fillStyle = `rgba(${v - 20},${v + 5},${v + 15},0.5)`;
      g.fillRect(Math.random() * 256, Math.random() * 128, 2, 2);
    }
    for (let i = 0; i < 14; i++) {
      g.fillStyle = "rgba(230,242,248,0.35)";
      g.fillRect(0, Math.random() * 128, 256, 3 + Math.random() * 7);
    }
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);
  return useMemo(() => {
    const m = {} as TexMap;
    (Object.keys(TEX_URLS) as (keyof typeof TEX_URLS)[]).forEach((k, i) => {
      loaded[i].colorSpace = THREE.SRGBColorSpace;
      loaded[i].anisotropy = 4;
      m[k] = loaded[i];
    });
    m.ice = ice;
    return m;
  }, [loaded, ice]);
}

function useGlowTexture() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 256;
    const g = c.getContext("2d")!;
    const grad = g.createRadialGradient(128, 128, 0, 128, 128, 128);
    grad.addColorStop(0, "rgba(255,236,190,0.9)");
    grad.addColorStop(0.25, "rgba(240,190,90,0.45)");
    grad.addColorStop(0.55, "rgba(200,140,50,0.14)");
    grad.addColorStop(1, "rgba(200,140,50,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, 256, 256);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);
}

function lerpKeys(p: number, keys: [number, number][]) {
  if (p <= keys[0][0]) return keys[0][1];
  for (let i = 1; i < keys.length; i++) {
    const [t0, v0] = keys[i - 1];
    const [t1, v1] = keys[i];
    if (p <= t1) return v0 + ((p - t0) / (t1 - t0)) * (v1 - v0);
  }
  return keys[keys.length - 1][1];
}

const ORIGIN = new THREE.Vector3(0, 0, 0);

/** Scroll → camera journey (PRD V5 §14). Smooth dolly + slow arc, no jumps. */
function CameraRig({
  progress,
  reduce,
  focus,
}: {
  progress: React.MutableRefObject<number>;
  reduce: boolean;
  focus: THREE.Vector3 | null;
}) {
  const { camera } = useThree();
  const look = useRef(new THREE.Vector3(0, 0, 0));
  const tmp = useRef(new THREE.Vector3());

  useFrame(() => {
    const p = reduce ? 0.35 : progress.current;
    const z = lerpKeys(p, [
      [0, 17],
      [0.2, 13],
      [0.4, 10],
      [0.6, 8],
      [0.8, 5.5],
      [1, 4.2],
    ]);
    const a = lerpKeys(p, [
      [0, 0],
      [0.3, 0.1],
      [0.6, 0.45],
      [0.8, 0.6],
      [1, 0.72],
    ]);
    const y = lerpKeys(p, [
      [0, 0.8],
      [0.4, 0.2],
      [1, 0],
    ]);
    tmp.current.set(Math.sin(a) * z, y, Math.cos(a) * z);
    camera.position.lerp(tmp.current, 0.06);
    look.current.lerp(focus ?? ORIGIN, 0.08);
    camera.lookAt(look.current);
  });
  return null;
}

function Sun({ tex, glow, reduce }: { tex: THREE.Texture; glow: THREE.Texture; reduce: boolean }) {
  const mesh = useRef<THREE.Mesh>(null);
  const sprite = useRef<THREE.Sprite>(null);
  useFrame((state) => {
    if (mesh.current && !reduce) mesh.current.rotation.y += 0.0006;
    if (sprite.current && !reduce) {
      const s = 5.1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.22;
      sprite.current.scale.set(s, s, 1);
    }
  });
  return (
    <group>
      <mesh ref={mesh}>
        <sphereGeometry args={[0.72, 48, 32]} />
        <meshBasicMaterial map={tex} toneMapped={false} />
      </mesh>
      <sprite ref={sprite} scale={[5.1, 5.1, 1]}>
        <spriteMaterial
          map={glow}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          opacity={0.9}
        />
      </sprite>
      <pointLight color="#fff0d0" intensity={5} distance={34} decay={1.4} />
      <Html center className="pointer-events-none select-none">
        <span className="whitespace-nowrap font-mono text-[9px] tracking-[0.3em] text-gold/90">
          WIJAYA
        </span>
      </Html>
    </group>
  );
}

function SaturnRing({
  tex,
  size,
}: {
  tex: THREE.Texture;
  size: number;
}) {
  const geo = useMemo(() => {
    const inner = size * 1.35;
    const outer = size * 2.15;
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
    <mesh geometry={geo} rotation={[-Math.PI / 2 + 0.42, 0.12, 0]}>
      <meshBasicMaterial map={tex} transparent side={THREE.DoubleSide} depthWrite={false} opacity={0.95} />
    </mesh>
  );
}

function Clouds({ tex, size, speed, reduce }: { tex: THREE.Texture; size: number; speed: number; reduce: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (ref.current && !reduce) ref.current.rotation.y += speed * 1.35 * 0.016;
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size * 1.018, 32, 24]} />
      <meshStandardMaterial map={tex} transparent depthWrite={false} roughness={1} metalness={0} />
    </mesh>
  );
}

function Planet({
  node,
  radius,
  angle,
  reduce,
  quality,
  tex,
  selected,
  onSelect,
}: {
  node: UniverseNode;
  radius: number;
  angle: number;
  reduce: boolean;
  quality: Quality;
  tex: TexMap;
  selected: boolean;
  onSelect: (n: UniverseNode | null) => void;
}) {
  const spin = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const map = node.body === "ice" ? tex.ice : tex[node.body as keyof typeof TEX_URLS];
  const seg: [number, number] = quality === "low" ? [20, 14] : [36, 24];
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;
  const spinSpeed = node.spin ?? 0.12;

  useFrame(() => {
    if (spin.current && !reduce) spin.current.rotation.y += spinSpeed * 0.016;
    if (mesh.current) {
      const t = hovered || selected ? 1.12 : 1;
      const s = mesh.current.scale;
      s.x += (t - s.x) * 0.12;
      s.y = s.z = s.x;
    }
  });

  return (
    <group>
      <group ref={spin}>
        <mesh
          ref={mesh}
          position={[x, 0, z]}
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
            onSelect(selected ? null : node);
          }}
        >
          <sphereGeometry args={[node.size, seg[0], seg[1]]} />
          <meshStandardMaterial
            map={map}
            color={node.tint ?? "#ffffff"}
            roughness={0.92}
            metalness={0.04}
            emissive="#d3a52d"
            emissiveIntensity={hovered || selected ? 0.28 : 0}
          />
        </mesh>
        {node.clouds && (
          <group position={[x, 0, z]}>
            <Clouds tex={tex.clouds} size={node.size} speed={spinSpeed} reduce={reduce} />
          </group>
        )}
        {node.ring && <SaturnRing tex={tex.ring} size={node.size} />}
      </group>
      {node.ring ? (
        <Html position={[x + node.size * 2.3, 0, z]} center className="pointer-events-none select-none" style={{ opacity: hovered || selected ? 1 : 0, transition: "opacity .25s" }}>
          <Label node={node} />
        </Html>
      ) : (
        <Html position={[x, node.size + 0.42, z]} center className="pointer-events-none select-none" style={{ opacity: hovered || selected ? 1 : 0, transition: "opacity .25s" }}>
          <Label node={node} />
        </Html>
      )}
    </group>
  );
}

function Label({ node }: { node: UniverseNode }) {
  return (
    <span className="whitespace-nowrap text-center">
      <span className="block font-mono text-[9px] tracking-[0.2em] text-paper">
        {node.name.toUpperCase()}
      </span>
      <span className="block font-mono text-[7.5px] tracking-[0.24em] text-paper/45">
        {node.category}
      </span>
    </span>
  );
}

function OrbitSystem({
  orbitIndex,
  radius,
  nodes,
  reduce,
  quality,
  tex,
  selected,
  onSelect,
}: {
  orbitIndex: number;
  radius: number;
  nodes: UniverseNode[];
  reduce: boolean;
  quality: Quality;
  tex: TexMap;
  selected: UniverseNode | null;
  onSelect: (n: UniverseNode | null) => void;
}) {
  const swing = useRef<THREE.Group>(null);
  const circle = useMemo(() => {
    const pts: [number, number, number][] = [];
    for (let i = 0; i <= 72; i++) {
      const a = (i / 72) * Math.PI * 2;
      pts.push([Math.cos(a) * radius, 0, Math.sin(a) * radius]);
    }
    return pts;
  }, [radius]);

  useFrame((_, dt) => {
    if (swing.current && !reduce) {
      const dir = orbitIndex % 2 ? 1 : -1;
      const sp = nodes[0]?.speed ?? 0.04;
      swing.current.rotation.y += dt * sp * dir;
    }
  });

  return (
    <group rotation={[0.09 * orbitIndex, 0, 0.05 * orbitIndex]}>
      <Line points={circle} color="#5b6b7a" lineWidth={1} transparent opacity={0.14} />
      <group ref={swing}>
        {nodes.map((n, i) => (
          <Planet
            key={n.id}
            node={n}
            radius={radius}
            angle={(i / nodes.length) * Math.PI * 2 + orbitIndex * 0.7}
            reduce={reduce}
            quality={quality}
            tex={tex}
            selected={selected?.id === n.id}
            onSelect={onSelect}
          />
        ))}
      </group>
    </group>
  );
}

function StarField({ count, reduce }: { count: number; reduce: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 17 + Math.random() * 11;
      const a = Math.random() * Math.PI * 2;
      const b = (Math.random() - 0.5) * Math.PI * 0.7;
      arr[i * 3] = Math.cos(a) * Math.cos(b) * r;
      arr[i * 3 + 1] = Math.sin(b) * r * 0.6;
      arr[i * 3 + 2] = Math.sin(a) * Math.cos(b) * r;
    }
    return arr;
  }, [count]);

  useFrame((_, dt) => {
    if (ref.current && !reduce) ref.current.rotation.y += dt * 0.008;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.045} color="#f8fafb" transparent opacity={0.5} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function Scene({
  progress,
  reduce,
  quality,
  selected,
  onSelect,
}: {
  progress: React.MutableRefObject<number>;
  reduce: boolean;
  quality: Quality;
  selected: UniverseNode | null;
  onSelect: (n: UniverseNode | null) => void;
}) {
  const tex = usePlanetTextures();
  const glow = useGlowTexture();
  const focus = useMemo(() => {
    if (!selected) return null;
    const orbitIndex = selected.orbit - 1;
    const radius = universeOrbits[orbitIndex]?.radius ?? 3;
    const siblings = universeNodes.filter((n) => n.orbit === selected.orbit);
    const idx = Math.max(0, siblings.findIndex((n) => n.id === selected.id));
    const angle = (idx / siblings.length) * Math.PI * 2 + selected.orbit * 0.7;
    return new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
  }, [selected]);

  return (
    <>
      <ambientLight intensity={0.14} />
      <hemisphereLight args={["#24313d", "#0a0e12", 0.3]} />
      <directionalLight position={[6, 8, 4]} intensity={0.25} color="#8fa3b0" />
      <CameraRig progress={progress} reduce={reduce} focus={focus} />
      <Sun tex={tex.sun} glow={glow} reduce={reduce} />
      {universeOrbits.map((o, i) => (
        <OrbitSystem
          key={o.id}
          orbitIndex={i + 1}
          radius={o.radius}
          nodes={universeNodes.filter((n) => n.orbit === i + 1)}
          reduce={reduce}
          quality={quality}
          tex={tex}
          selected={selected}
          onSelect={onSelect}
        />
      ))}
      <StarField count={quality === "low" ? 22 : 60} reduce={reduce} />
    </>
  );
}

export function UniverseCanvas({
  progress,
  reduce,
  quality,
  selected,
  onSelect,
}: {
  progress: React.MutableRefObject<number>;
  reduce: boolean;
  quality: Quality;
  selected: UniverseNode | null;
  onSelect: (n: UniverseNode | null) => void;
}) {
  return (
    <Canvas
      className="absolute inset-0"
      dpr={quality === "low" ? 1 : [1, 2]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0.8, 17], fov: 50, near: 0.1, far: 70 }}
    >
      <Suspense fallback={null}>
        <Scene progress={progress} reduce={reduce} quality={quality} selected={selected} onSelect={onSelect} />
      </Suspense>
    </Canvas>
  );
}

export type { PlanetBody };
