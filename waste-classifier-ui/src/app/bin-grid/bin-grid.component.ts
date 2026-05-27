import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { WasteBinService } from '../services/waste-bin.service';
import { WasteBinComponent } from '../waste-bin/waste-bin.component';

@Component({
  selector: 'app-bin-grid',
  imports: [WasteBinComponent],
  templateUrl: './bin-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BinGridComponent {
  private readonly wasteBinService = inject(WasteBinService);
  protected readonly bins = this.wasteBinService.bins;
  protected readonly binSelected = this.wasteBinService.binSelected;
}
