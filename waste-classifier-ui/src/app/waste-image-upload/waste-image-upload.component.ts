import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { ImageClassificationService } from '../services/image-classification.service';
import { FormControl, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-waste-image-upload',
  imports: [DecimalPipe],
  templateUrl: './waste-image-upload.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WasteImageUploadComponent {
  protected readonly imageClassifierService = inject(ImageClassificationService);

  protected readonly imageControl = new FormControl<File | null>(null,[
    Validators.required,
  ])
  protected readonly selectedFile = toSignal(this.imageControl.valueChanges,{
    initialValue: null,
  })
  protected readonly imageUrl = signal<string | null>(null);

  protected readonly displayFileSize = computed(() => {
    const size = this.selectedFile()?.size;
    return size? size / (1024 * 1024) : 0;
  });

  constructor() {
    effect((onCleanup) => {
      const file = this.selectedFile();
      if (file) {
        const url = URL.createObjectURL(file);
        this.imageUrl.set(url);
        onCleanup(() => {
          URL.revokeObjectURL(url)
        });
      }else{
        this.imageUrl.set(null);
      }
      onCleanup(() => {
        this.imageClassifierService.clearImage();
      })
    });
  }

  protected onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] || null;
    this.imageControl.setValue(file);
  }

  protected onSubmission(): void {
    if (this.imageClassifierService.prediction.hasValue()) {
      this.imageClassifierService.clearImage();
      this.imageControl.reset(null)
    }
    else if(this.imageControl.valid && this.imageControl.value){
      this.imageClassifierService.classifyImage(this.imageControl.value);
    }
  }
}
