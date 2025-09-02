import { pipeline } from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.0.0/dist/esm/transformers.min.js';

const vlm = await pipeline(
  'image-text-to-text',
  'onnx-community/FastVLM-0.5B-ONNX',
  { device: 'webgpu' }
);
