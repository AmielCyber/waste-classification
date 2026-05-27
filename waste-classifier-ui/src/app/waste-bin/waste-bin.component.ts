import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgClass, NgStyle, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-waste-bin',
  imports: [UpperCasePipe],
  templateUrl: './waste-bin.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WasteBinComponent {
  readonly isHighlighted = input(false);
  readonly wasteType = input.required<string>();
  readonly binColor = input.required<string>();
}
