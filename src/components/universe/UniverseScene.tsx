import { Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, Line } from "@react-three/drei";
import * as THREE from "three";
import { universeNodes, universeOrbits, type UniverseNode } from "../../data/universe";

const TIER_COLORS: Record<number, string> = {
  1: "#d3a52d",
  2: "#5b6b7a",
  3: "#7f0d22",
  4: "#41505d",
  5: "#8fa3b0",
};

type Quality = "low" | "high";

function lerpKeys(p: number, keys: [number, number][]) {
  if (p <= keys[0][0]) return keys[0][1];
  for (let i = 1; i < keys.length; i++) {
    const [t0, v0] = keys[i - 1];
    const [t1, v1] = keys[i];
    if (p <= t1) return v0 + ((p - t0) / (t1 - t0)) * (v1 - v0);
  }
  return keys[keys.length - 1][1];
}

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
    look.current.lerp(focus ?? THREE_NULL, 0.08);
    camera.lookAt(look.current);
  });
  return null;
}
const THREE_NULL = new THREE.Vector3(0, 0, 0);

function Core() {
  const ring = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (ring.current) ring.current.rotation.z += dt * 0.12;
  });
  return (
    <group>
      <mesh>
        <icosahedronGeometry args={[0.55, 1]} />
        <meshStandardMaterial
          color="#1b2630"
          emissive="#d3a52d"
          emissiveIntensity={0.55}
          metalness={0.85}
          roughness={0.25}
        />
      </mesh>
      <mesh scale={1.28}>
        <icosahedronGeometry args={[0.55, 1]} />
        <meshBasicMaterial color="#d3a52d" wireframe transparent opacity={0.22} />
      </mesh>
      <mesh ref={ring} rotation={[Math.PI / 2.1, 0, 0]}>
        <torusGeometry args={[1.15, 0.012, 8, 80]} />
        <meshBasicMaterial color="#5b6b7a" transparent opacity={0.55} />
      </mesh>
      <pointLight color="#d3a52d" intensity={3} distance={26} decay={1.2} />
      <Html center className="pointer-events-none select-none">
        <span className="whitespace-nowrap font-mono text-[9px] tracking-[0.3em] text-gold/80">
          WIJAYA
        </span>
      </Html>
    </group>
  );
}

function Planet({
  node,
  radius,
  angle,
  reduce,
  selected,
  onSelect,
}: {
  node: UniverseNode;
  radius: number;
  angle: number;
  reduce: boolean;
  selected: boolean;
  onSelect: (n: UniverseNode | null) => void;
}) {
  const group = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const color = TIER_COLORS[node.orbit] ?? "#5b6b7a";
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;

  useFrame((state, dt) => {
    if (!group.current || !mesh.current) return;
    if (!reduce) group.current.rotation.y += dt * node.speed * (node.orbit % 2 ? 1 : -1);
    const target = hovered || selected ? 1.1 : 1;
    mesh.current.scale.lerp({ x: target, y: target, z: target } as THREE.Vector3, 0.12);
    if (!reduce) mesh.current.rotation.y += dt * 0.15;
    if (hovered) document.body.style.cursor = "pointer";
    else document.body.style.cursor = "auto";
    void state;
  });

  return (
    <group ref={group}>
      <mesh
        ref={mesh}
        position={[x, 0, z]}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
        onPointerDown={(e) => {
          e.stopPropagation();
          onSelect(selected ? null : node);
        }}
      >
        <icosahedronGeometry args={[node.size, 1]} />
        <meshStandardMaterial
          color="#1b2630"
          emissive={color}
          emissiveIntensity={hovered || selected ? 0.5 : 0.22}
          metalness={0.8}
          roughness={0.32}
        />
      </mesh>
      <Html
        position={[x, node.size + 0.42, z]}
        center
        className="pointer-events-none select-none"
        style={{ opacity: hovered || selected ? 1 : 0, transition: "opacity .25s" }}
      >
        <span className="whitespace-nowrap text-center">
          <span className="block font-mono text-[9px] tracking-[0.2em] text-paper">
            {node.name.toUpperCase()}
          </span>
          <span className="block font-mono text-[7.5px] tracking-[0.24em] text-paper/45">
            {node.category}
          </span>
        </span>
      </Html>
    </group>
  );
}

function OrbitSystem({
  orbitIndex,
  radius,
  nodes,
  reduce,
  selected,
  onSelect,
}: {
  orbitIndex: number;
  radius: number;
  nodes: UniverseNode[];
  reduce: boolean;
  selected: UniverseNode | null;
  onSelect: (n: UniverseNode | null) => void;
}) {
  const circle = useMemo(() => {
    const pts: [number, number, number][] = [];
    for (let i = 0; i <= 72; i++) {
      const a = (i / 72) * Math.PI * 2;
      pts.push([Math.cos(a) * radius, 0, Math.sin(a) * radius]);
    }
    return pts;
  }, [radius]);

  return (
    <group rotation={[0.09 * orbitIndex, 0, 0.05 * orbitIndex]}>
      <Line
        points={circle}
        color="#5b6b7a"
        lineWidth={1}
        transparent
        opacity={0.16}
        dashed={false}
      />
      {nodes.map((n, i) => (
        <Planet
          key={n.id}
          node={n}
          radius={radius}
          angle={(i / nodes.length) * Math.PI * 2 + orbitIndex * 0.7}
          reduce={reduce}
          selected={selected?.id === n.id}
          onSelect={onSelect}
        />
      ))}
    </group>
  );
}

function StarField({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 16 + Math.random() * 10;
      const a = Math.random() * Math.PI * 2;
      const b = (Math.random() - 0.5) * Math.PI * 0.7;
      arr[i * 3] = Math.cos(a) * Math.cos(b) * r;
      arr[i * 3 + 1] = Math.sin(b) * r * 0.6;
      arr[i * 3 + 2] = Math.sin(a) * Math.cos(b) * r;
    }
    return arr;
  }, [count]);

  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.01;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#f8fafb"
        transparent
        opacity={0.45}
        sizeAttenuation
        depthWrite={false}
      />
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
  const focus = useMemo(() => {
    if (!selected) return null;
    const orbitIndex = selected.orbit - 1;
    const radius = universeOrbits[orbitIndex]?.radius ?? 3;
    const siblings = universeNodes.filter((n) => n.orbit === selected.orbit);
    const idx = siblings.findIndex((n) => n.id === selected.id);
    const angle = (idx / siblings.length) * Math.PI * 2 + orbitIndex * 0.7;
    return new THREE.Vector3(
      Math.cos(angle) * radius,
      0,
      Math.sin(angle) * radius,
    );
  }, [selected]);

  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[6, 8, 4]} intensity={0.6} color="#8fa3b0" />
      <CameraRig progress={progress} reduce={reduce} focus={focus} />
      <Core />
      {universeOrbits.map((o) => (
        <OrbitSystem
          key={o.id}
          orbitIndex={universeOrbits.indexOf(o) + 1}
          radius={o.radius}
          nodes={universeNodes.filter((n) => n.orbit === universeOrbits.indexOf(o) + 1)}
          reduce={reduce}
          selected={selected}
          onSelect={onSelect}
        />
      ))}
      <StarField count={quality === "low" ? 18 : 50} />
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
      camera={{ position: [0, 0.8, 17], fov: 50, near: 0.1, far: 60 }}
      onPointerMissed={() => onSelect(null)}
    >
      <Suspense fallback={null}>
        <Scene
          progress={progress}
          reduce={reduce}
          quality={quality}
          selected={selected}
          onSelect={onSelect}
        />
      </Suspense>
    </Canvas>
  );
}
