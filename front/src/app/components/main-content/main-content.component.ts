import { Component } from '@angular/core';
import {CardGameComponent} from '../card-game/card-game.component';

@Component({
  selector: 'app-main-content',
  imports: [
    CardGameComponent,
  ],
  standalone: true,
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})
export class MainContentComponent {

}
