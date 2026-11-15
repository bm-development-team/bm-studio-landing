/**
 * Hero scene: a soft pile of glossy pills, rounded bricks and rings in brand colours.
 * Bodies are pulled toward the centre, push each other apart and scatter away from the pointer.
 * Tiny hand-rolled physics (spheres + springs) — no physics engine, ~40 bodies.
 */
import {
  CapsuleGeometry,
  Color,
  DirectionalLight,
  type BufferGeometry,
  InstancedMesh,
  Matrix4,
  MeshPhysicalMaterial,
  NeutralToneMapping,
  PerspectiveCamera,
  PMREMGenerator,
  Quaternion,
  Scene,
  SRGBColorSpace,
  TorusGeometry,
  Vector3,
  WebGLRenderer,
} from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

interface Body {
  pos: Vector3;
  vel: Vector3;
  rot: Quaternion;
  spin: Vector3;
  radius: number;
  mesh: number;
  slot: number;
}

const PALETTE = {
  blue: { color: '#2033f7', roughness: 0.38, clearcoat: 0.4 },
  white: { color: '#eceef6', roughness: 0.55, clearcoat: 0.2 },
  black: { color: '#08080d', roughness: 0.16, clearcoat: 1 },
} as const;

const PULL = 1.6;
const DAMPING = 0.9;
const POINTER_RADIUS = 2.6;
const POINTER_FORCE = 70;

function makeGeometries(): { geo: BufferGeometry; radius: number }[] {
  return [
    { geo: new CapsuleGeometry(0.42, 0.9, 8, 24), radius: 0.78 },
    { geo: new RoundedBoxGeometry(1.15, 1.15, 1.15, 5, 0.28), radius: 0.8 },
    { geo: new TorusGeometry(0.58, 0.26, 24, 48), radius: 0.84 },
  ];
}

export function mountHero(card: HTMLElement): () => void {
  const canvas = document.createElement('canvas');
  canvas.className = 'hero-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  card.prepend(canvas);

  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = NeutralToneMapping;
  renderer.toneMappingExposure = 1;

  const scene = new Scene();
  const pmrem = new PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  pmrem.dispose();
  const key = new DirectionalLight('#ffffff', 1.6);
  key.position.set(4, 6, 8);
  scene.add(key);

  const camera = new PerspectiveCamera(32, 1, 0.1, 100);
  camera.position.set(0, 0, 18);

  const small = window.matchMedia('(max-width: 767px)').matches;
  const count = small ? 34 : 64;
  const geos = makeGeometries();
  const tones = Object.values(PALETTE);

  // one InstancedMesh per geometry × colour
  const meshes: InstancedMesh[] = [];
  const perMesh = Math.ceil(count / (geos.length * tones.length)) + 1;
  geos.forEach(({ geo }) =>
    tones.forEach((tone) => {
      const mat = new MeshPhysicalMaterial({
        color: new Color(tone.color),
        roughness: tone.roughness,
        clearcoat: tone.clearcoat,
        clearcoatRoughness: 0.2,
      });
      const mesh = new InstancedMesh(geo, mat, perMesh);
      mesh.count = 0;
      scene.add(mesh);
      meshes.push(mesh);
    }),
  );

  // mostly blue and black, fewer white — reads as brand, not confetti
  const toneWeights = [0.45, 0.22, 0.33];
  const pickTone = (): number => {
    const r = Math.random();
    return r < toneWeights[0] ? 0 : r < toneWeights[0] + toneWeights[1] ? 1 : 2;
  };

  const bodies: Body[] = [];
  for (let i = 0; i < count; i++) {
    const g = i % geos.length;
    let mesh = g * tones.length + pickTone();
    if (meshes[mesh].count >= perMesh) mesh = meshes.findIndex((m) => m.count < perMesh);
    const slot = meshes[mesh].count++;
    const a = Math.random() * Math.PI * 2;
    const d = 9 + Math.random() * 6;
    bodies.push({
      pos: new Vector3(Math.cos(a) * d, Math.sin(a) * d, (Math.random() - 0.5) * 4),
      vel: new Vector3(),
      rot: new Quaternion().setFromAxisAngle(new Vector3(Math.random(), Math.random(), Math.random()).normalize(), Math.random() * 6),
      spin: new Vector3((Math.random() - 0.5) * 0.6, (Math.random() - 0.5) * 0.6, (Math.random() - 0.5) * 0.6),
      radius: geos[g].radius,
      mesh,
      slot,
    });
  }

  // cluster shape follows the card: wider than tall on desktop, tall on phones
  const spread = new Vector3(1, 1, 1);
  // the headline lives bottom-left, so the pile leans right on desktop and up on phones
  const centre = new Vector3();
  const pointer = new Vector3(999, 999, 0);
  let pointerActive = false;

  const resize = (): void => {
    const { width, height } = card.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    const halfH = Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
    spread.set(Math.max(0.7, camera.aspect * 0.8) * halfH * 0.16, halfH * 0.16, 1);
    const halfW = halfH * camera.aspect;
    if (camera.aspect >= 1) centre.set(halfW * 0.18, halfH * 0.08, 0);
    else centre.set(0, halfH * 0.22, 0);
  };
  const ro = new ResizeObserver(resize);
  ro.observe(card);
  resize();

  // start just outside the visible frame so the fly-in is short on narrow (portrait) cards too
  {
    const halfH = Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
    const reach = Math.max(halfH, halfH * camera.aspect);
    for (const b of bodies) {
      const a = Math.random() * Math.PI * 2;
      const d = reach * (0.75 + Math.random() * 0.45);
      b.pos.set(centre.x + Math.cos(a) * d, centre.y + Math.sin(a) * d, b.pos.z);
    }
  }

  const onMove = (e: PointerEvent): void => {
    const r = card.getBoundingClientRect();
    const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
    const ny = -(((e.clientY - r.top) / r.height) * 2 - 1);
    const halfH = Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
    pointer.set(nx * halfH * camera.aspect, ny * halfH, 0);
    pointerActive = true;
  };
  const onLeave = (): void => { pointerActive = false; };
  card.addEventListener('pointermove', onMove);
  card.addEventListener('pointerdown', onMove);
  card.addEventListener('pointerleave', onLeave);

  const tmp = new Vector3();
  const relV = new Vector3();
  const dq = new Quaternion();
  const m4 = new Matrix4();
  const one = new Vector3(1, 1, 1);

  const step = (dt: number): void => {
    for (const b of bodies) {
      // spring to an ellipsoid centre
      tmp.set((centre.x - b.pos.x) / spread.x, (centre.y - b.pos.y) / spread.y, -b.pos.z * 1.5).multiplyScalar(PULL * 0.1);
      b.vel.addScaledVector(tmp, dt * 10);
      if (pointerActive) {
        tmp.subVectors(b.pos, pointer);
        tmp.z *= 0.4;
        const dist = tmp.length();
        if (dist < POINTER_RADIUS && dist > 0.001) {
          const push = (1 - dist / POINTER_RADIUS) * POINTER_FORCE;
          b.vel.addScaledVector(tmp.normalize(), push * dt);
          b.spin.x += tmp.y * push * dt * 0.08;
          b.spin.y -= tmp.x * push * dt * 0.08;
        }
      }
    }
    // soft sphere collisions
    for (let i = 0; i < bodies.length; i++) {
      for (let j = i + 1; j < bodies.length; j++) {
        const a = bodies[i];
        const c = bodies[j];
        tmp.subVectors(a.pos, c.pos);
        const min = a.radius + c.radius;
        const d2 = tmp.lengthSq();
        if (d2 < min * min && d2 > 1e-6) {
          const d = Math.sqrt(d2);
          const overlap = (min - d) * 0.5;
          tmp.multiplyScalar(1 / d);
          a.pos.addScaledVector(tmp, overlap);
          c.pos.addScaledVector(tmp, -overlap);
          const rel = tmp.dot(relV.subVectors(a.vel, c.vel));
          if (rel < 0) {
            a.vel.addScaledVector(tmp, -rel * 0.5);
            c.vel.addScaledVector(tmp, rel * 0.5);
          }
        }
      }
    }
    const damp = Math.pow(DAMPING, dt * 10);
    for (const b of bodies) {
      b.vel.multiplyScalar(damp);
      b.pos.addScaledVector(b.vel, dt);
      b.spin.multiplyScalar(0.985).clampLength(0.15, 4);
      dq.setFromAxisAngle(tmp.copy(b.spin).normalize(), b.spin.length() * dt);
      b.rot.premultiply(dq);
    }
  };

  const write = (): void => {
    for (const b of bodies) {
      m4.compose(b.pos, b.rot, one);
      meshes[b.mesh].setMatrixAt(b.slot, m4);
    }
    meshes.forEach((m) => { m.instanceMatrix.needsUpdate = true; });
  };

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let raf = 0;
  let visible = true;
  let last = performance.now();

  const frame = (now: number): void => {
    const dt = Math.min(0.033, (now - last) / 1000);
    last = now;
    step(dt);
    write();
    renderer.render(scene, camera);
    raf = visible ? requestAnimationFrame(frame) : 0;
  };

  if (reduce) {
    for (let i = 0; i < 600; i++) step(1 / 60);
    write();
    renderer.render(scene, camera);
  } else {
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting && !document.hidden;
      if (visible && !raf) { last = performance.now(); raf = requestAnimationFrame(frame); }
    });
    io.observe(card);
    raf = requestAnimationFrame(frame);
  }
  card.classList.add('is-ready');

  return () => {
    cancelAnimationFrame(raf);
    ro.disconnect();
    card.removeEventListener('pointermove', onMove);
    card.removeEventListener('pointerdown', onMove);
    card.removeEventListener('pointerleave', onLeave);
    renderer.dispose();
  };
}
