import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { BinGridComponent } from './bin-grid/bin-grid.component';
import { WasteImageUploadComponent } from './waste-image-upload/waste-image-upload.component';
import { WasteClassificationResultComponent } from './waste-classification-result/waste-classification-result.component';

@Component({
  selector: 'app-root',
  imports: [
    NavBarComponent,
    BinGridComponent,
    WasteImageUploadComponent,
    WasteClassificationResultComponent,
  ],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './app.css',
})
export class App {}
