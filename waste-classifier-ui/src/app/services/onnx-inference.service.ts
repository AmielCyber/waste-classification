import { Service } from '@angular/core';
import * as ort from 'onnxruntime-web';
import {WasteType} from './waste-bin.service';

export interface WasteClassification {
  type: WasteType;
  confidence: number;
}

const MODEL_BASE_URL = '/models';
const MODEL_FILE = 'mobilenetv4_realwaste.onnx';
const MODEL_DATA_FILE = 'mobilenetv4_realwaste.onnx.data';

const INPUT_SIZE = 224;
const CROP_PCT = 0.875;
const MEAN: readonly [number, number, number] = [0.485, 0.456, 0.406];
const STD: readonly [number, number, number] = [0.229, 0.224, 0.225];

const CLASS_LABELS: readonly WasteType[] = [
  'Cardboard',
  'Food Organics',
  'Glass',
  'Metal',
  'Miscellaneous Trash',
  'Paper',
  'Plastic',
  'Textile Trash',
  'Vegetation',
]

@Service()
export class OnnxInferenceService {
  private sessionPromise: Promise<ort.InferenceSession> | null = null;

  async classify(file: File): Promise<WasteClassification> {
    const session = await this.getSession();
    const inputTensor = await this.preprocess(file);

    const feeds:Record<string, ort.Tensor> = {
      [session.inputNames[0]]: inputTensor,
    };
    const outputs = await session.run(feeds);
    const logits = outputs[session.outputNames[0]].data as Float32Array;
    return this.toPrediction(logits);
  }

  private async getSession(): Promise<ort.InferenceSession> {
    if (!this.sessionPromise) {
      this.sessionPromise = this.createSession();
    }
    return this.sessionPromise;
  }

  private createSession(): Promise<ort.InferenceSession> {
    ort.env.wasm.wasmPaths = '/ort/';
    ort.env.wasm.numThreads = 1;

    return ort.InferenceSession.create(`${MODEL_BASE_URL}/${MODEL_FILE}`, {
      executionProviders: ['wasm'],
      externalData: [
        {
          path: MODEL_DATA_FILE,
          data: `${MODEL_BASE_URL}/${MODEL_DATA_FILE}`
        }
      ]
    })
  }

  private async preprocess(file: File): Promise<ort.Tensor> {
    const bitmap = await createImageBitmap(file);

    const resizeTo = Math.round(INPUT_SIZE / CROP_PCT);
    const scale = resizeTo / Math.min(bitmap.width, bitmap.height);
    const resizedW = Math.round(bitmap.width * scale);
    const resizedH = Math.round(bitmap.height * scale);

    const canvas = document.createElement('canvas');
    canvas.width = resizedW;
    canvas.height = resizedH;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(bitmap, 0, 0, resizedW, resizedH);
    bitmap.close();

    const cropX = Math.round((resizedW - INPUT_SIZE) / 2);
    const cropY = Math.round((resizedH - INPUT_SIZE) / 2);
    const { data } = ctx.getImageData(cropX, cropY, INPUT_SIZE, INPUT_SIZE);

    const plane = INPUT_SIZE * INPUT_SIZE;
    const chw = new Float32Array(3 * plane);
    for (let i = 0; i < plane; i++) {
      chw[i] = (data[i * 4] / 255 - MEAN[0]) / STD[0]; // R
      chw[plane + i] = (data[i * 4 + 1] / 255 - MEAN[1]) / STD[1]; // G
      chw[2 * plane + i] = (data[i * 4 + 2] / 255 - MEAN[2]) / STD[2]; // B
    }

    return new ort.Tensor('float32', chw, [1, 3, INPUT_SIZE, INPUT_SIZE]);
  }

  private toPrediction(logits: Float32Array): WasteClassification {
    const maxIndex = Math.max(...logits);
    const exps = Array.from(logits, (v) => Math.exp(v-maxIndex));
    const sum = exps.reduce((a, b) => a + b, 0);
    const probs = exps.map((v) => v / sum);

    let bestIndex = 0;
    for(let i = 1; i < probs.length; i++){
      if(probs[i] > probs[bestIndex]){
        bestIndex = i;
      }
    }
    console.log("Detected: ", CLASS_LABELS[bestIndex], " with confidence: ", probs[bestIndex], "");
    return {
      type: CLASS_LABELS[bestIndex],
      confidence: probs[bestIndex],
    }
  }
}
