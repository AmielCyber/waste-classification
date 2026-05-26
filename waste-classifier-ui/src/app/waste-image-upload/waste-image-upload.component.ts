import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { ImageClassificationService } from '../services/image-classification.service';

@Component({
  selector: 'app-waste-image-upload',
  imports: [DecimalPipe],
  templateUrl: './waste-image-upload.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WasteImageUploadComponent {
  private readonly destroyRef = inject(DestroyRef);
  protected readonly imageClassifierService = inject(ImageClassificationService);

  protected readonly selectedFile = signal<File | null>(null);
  protected readonly imageUrl = signal<string | null>(null);

  protected readonly fileName = computed(() => {
    const name = this.selectedFile()?.name ?? '';
    return name === '' ? name : name.slice(0, 10) + '...';
  });
  protected readonly displayFileSize = computed(() => {
    const size = this.selectedFile()?.size ?? 0;
    return size === 0 ? size : size / 1024;
  });

  constructor() {
    this.destroyRef.onDestroy(() => {
      const url = this.imageUrl();
      if (url) {
        URL.revokeObjectURL(url);
      }
    });
  }

  protected onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const oldUrl = this.imageUrl();
      if (oldUrl) {
        URL.revokeObjectURL(oldUrl);
      }
      this.selectedFile.set(file);
      this.imageUrl.set(URL.createObjectURL(file));
    }
  }

  protected onImageUpload(): void {
    const file = this.selectedFile();
    if (file) {
      this.imageClassifierService.classifyImage(file);
    }
  }
}
