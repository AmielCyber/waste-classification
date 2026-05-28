import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { DecimalPipe, PercentPipe } from '@angular/common';
import { ImageClassificationService } from '../services/image-classification.service';

@Component({
  selector: 'app-waste-classification-result',
  imports: [PercentPipe],
  templateUrl: './waste-classification-result.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WasteClassificationResultComponent {
  readonly imageClassificationService = inject(ImageClassificationService);
  protected readonly prediction = this.imageClassificationService.prediction;
}
