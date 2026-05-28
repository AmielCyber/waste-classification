import { Injectable, signal } from '@angular/core';
import {httpResource} from '@angular/common/http';
import { WasteType } from './waste-bin.service';

export interface ClassificationResult {
  type: WasteType;
  confidence: number;
}

@Injectable({
  providedIn: 'root',
})
export class ImageClassificationService {
  private readonly imageFile = signal<File | null>(null);

  readonly prediction = httpResource<ClassificationResult>(() => {
    const file = this.imageFile(); // Reacts to imageFile state changed.
    if (!file) {
      return undefined;
    }

    const formData = new FormData();
    formData.append('image', file);

    return {
      url: '/api/predict-image',
      method: 'POST',
      body: formData,
    };
  });

  classifyImage(file: File): void {
    // Trigger reactivity so prediction can be called.
    this.imageFile.set(file);
  }

  clearImage(): void {
    this.imageFile.set(null);
  }
}
