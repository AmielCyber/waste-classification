import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WasteBinComponent } from './waste-bin/waste-bin.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WasteBinComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
