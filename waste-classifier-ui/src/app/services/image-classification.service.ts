import {Service, injectAsync, onIdle, resource, signal} from '@angular/core';
import type {WasteClassification} from './onnx-inference.service';

@Service()
export class ImageClassificationService {
  private readonly imageFile = signal<File | undefined>(undefined);

  private readonly getInferenceService = injectAsync(
    () => import('./onnx-inference.service').then(m => m.OnnxInferenceService),
    {prefetch: onIdle}
  )

  readonly prediction = resource({
    params: () => ({file: this.imageFile()}),
    loader: async({params, abortSignal}): Promise<WasteClassification> => {
      if(params.file){
        const inferenceService = await this.getInferenceService();
        const result = await inferenceService.classify(params.file);
        if (abortSignal.aborted) {
          throw new DOMException('Clasification aborted', 'AbortError');
        }
        return result;
      }else{
        throw new DOMException('Classification aborted', 'AbortError');
      }
    }
  });

  classifyImage(file: File): void {
    this.imageFile.set(file);
  }

  clearImage(): void {
    this.imageFile.set(undefined);
  }

}
