import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WasteBinComponent } from './waste-bin/waste-bin.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WasteBinComponent, NavBarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
