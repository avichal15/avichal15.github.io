import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_PATH = path.resolve(__dirname, '../public/models/avatar_base.glb');

/**
 * Generates a Khronos-compliant binary glTF 2.0 (.glb) rigged minifigure model
 * containing:
 * - Hierarchical skeleton/node tree: Root -> Hips -> Torso -> Neck -> Head, Arm_L -> Hand_L, Arm_R -> Hand_R, Leg_L, Leg_R
 * - 5 outfit variant mesh groups: Outfit_Base, Outfit_Doctor, Outfit_Techy, Outfit_Masterplayer, Outfit_Gotham
 * - 6 named keyframe animations: Idle, Walk, Run, Jump, Wave, Point
 */
function createBoxGeometry(w, h, d, offsetY = 0) {
  const hw = w / 2;
  const hh = h / 2;
  const hd = d / 2;
  const y0 = -hh + offsetY;
  const y1 = hh + offsetY;

  // 24 vertices (4 per face for crisp normals)
  const positions = new Float32Array([
    // Front (+Z)
    -hw, y0,  hd,   hw, y0,  hd,   hw, y1,  hd,  -hw, y1,  hd,
    // Back (-Z)
     hw, y0, -hd,  -hw, y0, -hd,  -hw, y1, -hd,   hw, y1, -hd,
    // Top (+Y)
    -hw, y1,  hd,   hw, y1,  hd,   hw, y1, -hd,  -hw, y1, -hd,
    // Bottom (-Y)
    -hw, y0, -hd,   hw, y0, -hd,   hw, y0,  hd,  -hw, y0,  hd,
    // Right (+X)
     hw, y0,  hd,   hw, y0, -hd,   hw, y1, -hd,   hw, y1,  hd,
    // Left (-X)
    -hw, y0, -hd,  -hw, y0,  hd,  -hw, y1,  hd,  -hw, y1, -hd,
  ]);

  const normals = new Float32Array([
    0, 0, 1,  0, 0, 1,  0, 0, 1,  0, 0, 1,
    0, 0,-1,  0, 0,-1,  0, 0,-1,  0, 0,-1,
    0, 1, 0,  0, 1, 0,  0, 1, 0,  0, 1, 0,
    0,-1, 0,  0,-1, 0,  0,-1, 0,  0,-1, 0,
    1, 0, 0,  1, 0, 0,  1, 0, 0,  1, 0, 0,
   -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0,
  ]);

  const indices = new Uint16Array([
     0,  1,  2,   0,  2,  3,
     4,  5,  6,   4,  6,  7,
     8,  9, 10,   8, 10, 11,
    12, 13, 14,  12, 14, 15,
    16, 17, 18,  16, 18, 19,
    20, 21, 22,  20, 22, 23,
  ]);

  return {
    positions,
    normals,
    indices,
    min: [-hw, y0, -hd],
    max: [hw, y1, hd],
  };
}

function quatFromEulerXYZ(rx, ry, rz) {
  const cx = Math.cos(rx * 0.5), sx = Math.sin(rx * 0.5);
  const cy = Math.cos(ry * 0.5), sy = Math.sin(ry * 0.5);
  const cz = Math.cos(rz * 0.5), sz = Math.sin(rz * 0.5);
  return [
    sx * cy * cz + cx * sy * sz,
    cx * sy * cz - sx * cy * sz,
    cx * cy * sz + sx * sy * cz,
    cx * cy * cz - sx * sy * sz,
  ];
}

function buildGlb() {
  const bufferChunks = [];
  const bufferViews = [];
  const accessors = [];
  let byteOffset = 0;

  function appendBuffer(typedArray, target) {
    const u8 = new Uint8Array(typedArray.buffer, typedArray.byteOffset, typedArray.byteLength);
    const pad = (4 - (u8.byteLength % 4)) % 4;
    bufferChunks.push(u8);
    if (pad > 0) bufferChunks.push(new Uint8Array(pad));

    const viewIndex = bufferViews.length;
    const view = {
      buffer: 0,
      byteOffset,
      byteLength: u8.byteLength,
    };
    if (target) view.target = target;
    bufferViews.push(view);
    byteOffset += u8.byteLength + pad;
    return viewIndex;
  }

  function addAccessor(typedArray, componentType, count, type, min, max, target) {
    const bufferView = appendBuffer(typedArray, target);
    const accIndex = accessors.length;
    const acc = {
      bufferView,
      componentType,
      count,
      type,
    };
    if (min) acc.min = min;
    if (max) acc.max = max;
    accessors.push(acc);
    return accIndex;
  }

  function addMeshPrimitive(geom, materialIndex) {
    const posAcc = addAccessor(geom.positions, 5126, geom.positions.length / 3, 'VEC3', geom.min, geom.max, 34962);
    const normAcc = addAccessor(geom.normals, 5126, geom.normals.length / 3, 'VEC3', undefined, undefined, 34962);
    const idxAcc = addAccessor(geom.indices, 5123, geom.indices.length, 'SCALAR', undefined, undefined, 34963);
    return {
      attributes: { POSITION: posAcc, NORMAL: normAcc },
      indices: idxAcc,
      material: materialIndex,
    };
  }

  // Materials matching the 5 discovered reference sheets
  const materials = [
    { name: 'Mat_Skin_Warm', pbrMetallicRoughness: { baseColorFactor: [0.953, 0.776, 0.624, 1], metallicFactor: 0.02, roughnessFactor: 0.25 } },
    { name: 'Mat_Hair_Beard_Black', pbrMetallicRoughness: { baseColorFactor: [0.09, 0.094, 0.11, 1], metallicFactor: 0.05, roughnessFactor: 0.32 } },
    { name: 'Mat_Base_Sweater_Black', pbrMetallicRoughness: { baseColorFactor: [0.078, 0.086, 0.098, 1], metallicFactor: 0.04, roughnessFactor: 0.28 } },
    { name: 'Mat_Doctor_White_Coat', pbrMetallicRoughness: { baseColorFactor: [0.965, 0.973, 0.984, 1], metallicFactor: 0.02, roughnessFactor: 0.22 } },
    { name: 'Mat_Doctor_Teal_Scrubs', pbrMetallicRoughness: { baseColorFactor: [0.102, 0.498, 0.557, 1], metallicFactor: 0.04, roughnessFactor: 0.26 } },
    { name: 'Mat_Techy_Navy_Hoodie', pbrMetallicRoughness: { baseColorFactor: [0.118, 0.149, 0.22, 1], metallicFactor: 0.06, roughnessFactor: 0.28 } },
    { name: 'Mat_Techy_Cyan_Glow', pbrMetallicRoughness: { baseColorFactor: [0.133, 0.827, 0.933, 1], metallicFactor: 0.1, roughnessFactor: 0.15 }, emissiveFactor: [0.05, 0.45, 0.55] },
    { name: 'Mat_Masterplayer_Plaid_Red', pbrMetallicRoughness: { baseColorFactor: [0.784, 0.157, 0.161, 1], metallicFactor: 0.04, roughnessFactor: 0.3 } },
    { name: 'Mat_Gotham_Armor_Dark', pbrMetallicRoughness: { baseColorFactor: [0.059, 0.067, 0.082, 1], metallicFactor: 0.18, roughnessFactor: 0.22 } },
    { name: 'Mat_Gotham_Crest_Gold', pbrMetallicRoughness: { baseColorFactor: [0.98, 0.8, 0.082, 1], metallicFactor: 0.3, roughnessFactor: 0.18 } },
    { name: 'Mat_Denim_Indigo', pbrMetallicRoughness: { baseColorFactor: [0.137, 0.224, 0.357, 1], metallicFactor: 0.03, roughnessFactor: 0.35 } },
  ];

  const meshes = [
    { name: 'Mesh_Hips', primitives: [addMeshPrimitive(createBoxGeometry(1.16, 0.28, 0.62, 0), 2)] },
    { name: 'Mesh_Torso_Base', primitives: [addMeshPrimitive(createBoxGeometry(1.22, 1.15, 0.66, 0.58), 2)] },
    { name: 'Mesh_Head', primitives: [addMeshPrimitive(createBoxGeometry(0.84, 0.82, 0.84, 0.41), 0)] },
    { name: 'Mesh_Hair_Beard', primitives: [
      addMeshPrimitive(createBoxGeometry(0.92, 0.38, 0.92, 0.72), 1),
      addMeshPrimitive(createBoxGeometry(0.86, 0.28, 0.86, 0.14), 1),
    ] },
    { name: 'Mesh_Arm_L', primitives: [addMeshPrimitive(createBoxGeometry(0.32, 0.86, 0.34, -0.38), 2)] },
    { name: 'Mesh_Hand_L', primitives: [addMeshPrimitive(createBoxGeometry(0.26, 0.26, 0.28, -0.12), 0)] },
    { name: 'Mesh_Arm_R', primitives: [addMeshPrimitive(createBoxGeometry(0.32, 0.86, 0.34, -0.38), 2)] },
    { name: 'Mesh_Hand_R', primitives: [addMeshPrimitive(createBoxGeometry(0.26, 0.26, 0.28, -0.12), 0)] },
    { name: 'Mesh_Leg_L', primitives: [addMeshPrimitive(createBoxGeometry(0.52, 1.05, 0.62, -0.52), 2)] },
    { name: 'Mesh_Leg_R', primitives: [addMeshPrimitive(createBoxGeometry(0.52, 1.05, 0.62, -0.52), 2)] },
    // Outfit variant overlay meshes
    { name: 'Mesh_Outfit_Base', primitives: [addMeshPrimitive(createBoxGeometry(1.24, 1.16, 0.68, 0.58), 2)] },
    { name: 'Mesh_Outfit_Doctor', primitives: [
      addMeshPrimitive(createBoxGeometry(1.26, 1.18, 0.70, 0.58), 3),
      addMeshPrimitive(createBoxGeometry(0.52, 1.16, 0.71, 0.58), 4),
    ] },
    { name: 'Mesh_Outfit_Techy', primitives: [
      addMeshPrimitive(createBoxGeometry(1.26, 1.18, 0.70, 0.58), 5),
      addMeshPrimitive(createBoxGeometry(0.46, 0.46, 0.72, 0.62), 6),
    ] },
    { name: 'Mesh_Outfit_Masterplayer', primitives: [
      addMeshPrimitive(createBoxGeometry(1.26, 1.18, 0.70, 0.58), 7),
      addMeshPrimitive(createBoxGeometry(0.48, 0.48, 0.72, 0.60), 9),
    ] },
    { name: 'Mesh_Outfit_Gotham', primitives: [
      addMeshPrimitive(createBoxGeometry(1.28, 1.20, 0.72, 0.58), 8),
      addMeshPrimitive(createBoxGeometry(0.52, 0.24, 0.74, 0.72), 9),
      addMeshPrimitive(createBoxGeometry(1.20, 0.18, 0.68, 0.04), 9),
    ] },
  ];

  // Node indices:
  // 0: Root
  // 1: Hips
  // 2: Torso
  // 3: Neck
  // 4: Head
  // 5: Hair_And_Beard
  // 6: Arm_L
  // 7: Hand_L
  // 8: Arm_R
  // 9: Hand_R
  // 10: Leg_L
  // 11: Leg_R
  // 12: Outfit_Base
  // 13: Outfit_Doctor
  // 14: Outfit_Techy
  // 15: Outfit_Masterplayer
  // 16: Outfit_Gotham
  const nodes = [
    { name: 'Root', translation: [0, 0, 0], rotation: [0, 0, 0, 1], scale: [1, 1, 1], children: [1] },
    { name: 'Hips', mesh: 0, translation: [0, 1.05, 0], rotation: [0, 0, 0, 1], children: [2, 10, 11] },
    { name: 'Torso', mesh: 1, translation: [0, 0.14, 0], rotation: [0, 0, 0, 1], children: [3, 6, 8, 12, 13, 14, 15, 16] },
    { name: 'Neck', translation: [0, 1.16, 0], rotation: [0, 0, 0, 1], children: [4] },
    { name: 'Head', mesh: 2, translation: [0, 0.04, 0], rotation: [0, 0, 0, 1], children: [5] },
    { name: 'Hair_And_Beard', mesh: 3, translation: [0, 0, 0], rotation: [0, 0, 0, 1] },
    { name: 'Arm_L', mesh: 4, translation: [-0.78, 1.02, 0], rotation: [0, 0, 0, 1], children: [7] },
    { name: 'Hand_L', mesh: 5, translation: [0, -0.86, 0], rotation: [0, 0, 0, 1] },
    { name: 'Arm_R', mesh: 6, translation: [0.78, 1.02, 0], rotation: [0, 0, 0, 1], children: [9] },
    { name: 'Hand_R', mesh: 7, translation: [0, -0.86, 0], rotation: [0, 0, 0, 1] },
    { name: 'Leg_L', mesh: 8, translation: [-0.30, 0, 0], rotation: [0, 0, 0, 1] },
    { name: 'Leg_R', mesh: 9, translation: [0.30, 0, 0], rotation: [0, 0, 0, 1] },
    { name: 'Outfit_Base', mesh: 10, translation: [0, 0, 0], rotation: [0, 0, 0, 1] },
    { name: 'Outfit_Doctor', mesh: 11, translation: [0, 0, 0], rotation: [0, 0, 0, 1] },
    { name: 'Outfit_Techy', mesh: 12, translation: [0, 0, 0], rotation: [0, 0, 0, 1] },
    { name: 'Outfit_Masterplayer', mesh: 13, translation: [0, 0, 0], rotation: [0, 0, 0, 1] },
    { name: 'Outfit_Gotham', mesh: 14, translation: [0, 0, 0], rotation: [0, 0, 0, 1] },
  ];

  // Keyframe animation helper
  const times = new Float32Array([0.0, 0.3, 0.6, 0.9, 1.2]);
  const timeAcc = addAccessor(times, 5126, times.length, 'SCALAR', [0.0], [1.2]);

  function addQuatTrack(keyframes) {
    const flat = new Float32Array(keyframes.length * 4);
    keyframes.forEach((q, i) => flat.set(q, i * 4));
    return addAccessor(flat, 5126, keyframes.length, 'VEC4');
  }

  function addVec3Track(keyframes) {
    const flat = new Float32Array(keyframes.length * 3);
    keyframes.forEach((v, i) => flat.set(v, i * 3));
    return addAccessor(flat, 5126, keyframes.length, 'VEC3');
  }

  // 1. Idle clip
  const idleHeadOut = addQuatTrack([
    quatFromEulerXYZ(0, 0, 0),
    quatFromEulerXYZ(0.03, 0.08, 0),
    quatFromEulerXYZ(0, 0, 0),
    quatFromEulerXYZ(0.02, -0.08, 0),
    quatFromEulerXYZ(0, 0, 0),
  ]);
  const idleArmROut = addQuatTrack([
    quatFromEulerXYZ(0, 0, -0.05),
    quatFromEulerXYZ(0.06, 0, -0.08),
    quatFromEulerXYZ(0, 0, -0.05),
    quatFromEulerXYZ(-0.05, 0, -0.04),
    quatFromEulerXYZ(0, 0, -0.05),
  ]);

  // 2. Walk clip
  const walkLegLOut = addQuatTrack([
    quatFromEulerXYZ(0, 0, 0),
    quatFromEulerXYZ(0.55, 0, 0),
    quatFromEulerXYZ(0, 0, 0),
    quatFromEulerXYZ(-0.55, 0, 0),
    quatFromEulerXYZ(0, 0, 0),
  ]);
  const walkLegROut = addQuatTrack([
    quatFromEulerXYZ(0, 0, 0),
    quatFromEulerXYZ(-0.55, 0, 0),
    quatFromEulerXYZ(0, 0, 0),
    quatFromEulerXYZ(0.55, 0, 0),
    quatFromEulerXYZ(0, 0, 0),
  ]);
  const walkArmLOut = addQuatTrack([
    quatFromEulerXYZ(0, 0, 0),
    quatFromEulerXYZ(-0.45, 0, 0),
    quatFromEulerXYZ(0, 0, 0),
    quatFromEulerXYZ(0.45, 0, 0),
    quatFromEulerXYZ(0, 0, 0),
  ]);
  const walkArmROut = addQuatTrack([
    quatFromEulerXYZ(0, 0, 0),
    quatFromEulerXYZ(0.45, 0, 0),
    quatFromEulerXYZ(0, 0, 0),
    quatFromEulerXYZ(-0.45, 0, 0),
    quatFromEulerXYZ(0, 0, 0),
  ]);

  // 3. Run clip
  const runLegLOut = addQuatTrack([
    quatFromEulerXYZ(0, 0, 0),
    quatFromEulerXYZ(0.85, 0, 0),
    quatFromEulerXYZ(0, 0, 0),
    quatFromEulerXYZ(-0.85, 0, 0),
    quatFromEulerXYZ(0, 0, 0),
  ]);
  const runLegROut = addQuatTrack([
    quatFromEulerXYZ(0, 0, 0),
    quatFromEulerXYZ(-0.85, 0, 0),
    quatFromEulerXYZ(0, 0, 0),
    quatFromEulerXYZ(0.85, 0, 0),
    quatFromEulerXYZ(0, 0, 0),
  ]);

  // 4. Jump clip
  const jumpHipsPosOut = addVec3Track([
    [0, 1.05, 0],
    [0, 0.92, 0],
    [0, 1.65, 0],
    [0, 1.15, 0],
    [0, 1.05, 0],
  ]);
  const jumpArmROut = addQuatTrack([
    quatFromEulerXYZ(0, 0, 0),
    quatFromEulerXYZ(0.3, 0, 0),
    quatFromEulerXYZ(-2.5, 0, -0.2),
    quatFromEulerXYZ(-1.2, 0, -0.1),
    quatFromEulerXYZ(0, 0, 0),
  ]);

  // 5. Wave clip
  const waveArmROut = addQuatTrack([
    quatFromEulerXYZ(0, 0, 0),
    quatFromEulerXYZ(-2.4, 0, -0.35),
    quatFromEulerXYZ(-2.4, 0, -0.05),
    quatFromEulerXYZ(-2.4, 0, -0.38),
    quatFromEulerXYZ(0, 0, 0),
  ]);

  // 6. Point clip
  const pointArmROut = addQuatTrack([
    quatFromEulerXYZ(0, 0, 0),
    quatFromEulerXYZ(-1.35, 0.35, -0.2),
    quatFromEulerXYZ(-1.42, 0.42, -0.25),
    quatFromEulerXYZ(-1.35, 0.35, -0.2),
    quatFromEulerXYZ(0, 0, 0),
  ]);

  const animations = [
    {
      name: 'Idle',
      samplers: [
        { input: timeAcc, interpolation: 'LINEAR', output: idleHeadOut },
        { input: timeAcc, interpolation: 'LINEAR', output: idleArmROut },
      ],
      channels: [
        { sampler: 0, target: { node: 4, path: 'rotation' } },
        { sampler: 1, target: { node: 8, path: 'rotation' } },
      ],
    },
    {
      name: 'Walk',
      samplers: [
        { input: timeAcc, interpolation: 'LINEAR', output: walkLegLOut },
        { input: timeAcc, interpolation: 'LINEAR', output: walkLegROut },
        { input: timeAcc, interpolation: 'LINEAR', output: walkArmLOut },
        { input: timeAcc, interpolation: 'LINEAR', output: walkArmROut },
      ],
      channels: [
        { sampler: 0, target: { node: 10, path: 'rotation' } },
        { sampler: 1, target: { node: 11, path: 'rotation' } },
        { sampler: 2, target: { node: 6, path: 'rotation' } },
        { sampler: 3, target: { node: 8, path: 'rotation' } },
      ],
    },
    {
      name: 'Run',
      samplers: [
        { input: timeAcc, interpolation: 'LINEAR', output: runLegLOut },
        { input: timeAcc, interpolation: 'LINEAR', output: runLegROut },
      ],
      channels: [
        { sampler: 0, target: { node: 10, path: 'rotation' } },
        { sampler: 1, target: { node: 11, path: 'rotation' } },
      ],
    },
    {
      name: 'Jump',
      samplers: [
        { input: timeAcc, interpolation: 'LINEAR', output: jumpHipsPosOut },
        { input: timeAcc, interpolation: 'LINEAR', output: jumpArmROut },
      ],
      channels: [
        { sampler: 0, target: { node: 1, path: 'translation' } },
        { sampler: 1, target: { node: 8, path: 'rotation' } },
      ],
    },
    {
      name: 'Wave',
      samplers: [
        { input: timeAcc, interpolation: 'LINEAR', output: waveArmROut },
      ],
      channels: [
        { sampler: 0, target: { node: 8, path: 'rotation' } },
      ],
    },
    {
      name: 'Point',
      samplers: [
        { input: timeAcc, interpolation: 'LINEAR', output: pointArmROut },
      ],
      channels: [
        { sampler: 0, target: { node: 8, path: 'rotation' } },
      ],
    },
  ];

  const gltfJson = {
    asset: {
      version: '2.0',
      generator: 'Avichal-Portfolio-GLB-Builder/1.0',
      copyright: 'Avichal Goyal (IP-Safe Original Minifigure Rig)',
    },
    scene: 0,
    scenes: [{ name: 'AvichalMinifigureScene', nodes: [0] }],
    nodes,
    meshes,
    materials,
    accessors,
    bufferViews,
    buffers: [{ byteLength: byteOffset }],
    animations,
  };

  const jsonStr = JSON.stringify(gltfJson);
  const jsonBytes = Buffer.from(jsonStr, 'utf8');
  const jsonPad = (4 - (jsonBytes.byteLength % 4)) % 4;
  const jsonChunkLength = jsonBytes.byteLength + jsonPad;

  const binChunkLength = byteOffset;
  const totalLength = 12 + 8 + jsonChunkLength + 8 + binChunkLength;

  const glb = Buffer.alloc(totalLength);
  let offset = 0;

  // GLB Header (magic 'glTF', version 2, totalLength)
  glb.writeUInt32LE(0x46546C67, offset); offset += 4;
  glb.writeUInt32LE(2, offset); offset += 4;
  glb.writeUInt32LE(totalLength, offset); offset += 4;

  // JSON Chunk Header (chunkLength, chunkType 'JSON' = 0x4E4F534A)
  glb.writeUInt32LE(jsonChunkLength, offset); offset += 4;
  glb.writeUInt32LE(0x4E4F534A, offset); offset += 4;
  jsonBytes.copy(glb, offset); offset += jsonBytes.byteLength;
  for (let i = 0; i < jsonPad; i++) {
    glb.writeUInt8(0x20, offset++); // pad JSON with spaces
  }

  // BIN Chunk Header (chunkLength, chunkType 'BIN\0' = 0x004E4942)
  glb.writeUInt32LE(binChunkLength, offset); offset += 4;
  glb.writeUInt32LE(0x004E4942, offset); offset += 4;
  for (const chunk of bufferChunks) {
    Buffer.from(chunk.buffer, chunk.byteOffset, chunk.byteLength).copy(glb, offset);
    offset += chunk.byteLength;
  }

  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
  fs.writeFileSync(OUT_PATH, glb);
  console.log(`Generated valid GLB: ${OUT_PATH} (${glb.byteLength} bytes, ${nodes.length} nodes, ${meshes.length} meshes, ${animations.length} animations)`);
}

buildGlb();
