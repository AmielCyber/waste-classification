import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-waste-bin',
  imports: [UpperCasePipe],
  templateUrl: './waste-bin.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WasteBinComponent {
  readonly wasteType = input.required<string>();
  readonly binColor = input.required<string>();
}
