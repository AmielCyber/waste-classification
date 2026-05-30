import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { WasteBinService } from '../services/waste-bin.service';
import { WasteBinComponent } from '../waste-bin/waste-bin.component';
import { ImageClassificationService } from '../services/image-classification.service';

@Component({
  selector: 'app-bin-grid',
  imports: [WasteBinComponent],
  templateUrl: './bin-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BinGridComponent {
  private readonly wasteBinService = inject(WasteBinService);
  private readonly imageClassifierService = inject(ImageClassificationService);

  protected readonly bins = this.wasteBinService.bins;
  protected readonly selectedBin = computed(() => {
    if (this.imageClassifierService.prediction.hasValue()) {
      return this.imageClassifierService.prediction.value().type;
    }
    return null;
  });
}
