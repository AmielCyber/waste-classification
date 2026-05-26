import { Component} from '@angular/core';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { BinGridComponent } from './bin-grid/bin-grid.component';
import { WasteImageUploadComponent } from './waste-image-upload/waste-image-upload.component';

@Component({
  selector: 'app-root',
  imports: [NavBarComponent, BinGridComponent, WasteImageUploadComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
