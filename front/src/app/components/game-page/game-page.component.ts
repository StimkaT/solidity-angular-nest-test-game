import {Component, Input} from '@angular/core';
import {PlayerProfileComponent} from '../player-profile/player-profile.component';

@Component({
  selector: 'app-game-page',
  imports: [
    PlayerProfileComponent
  ],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.scss'
})
export class GamePageComponent {
  @Input() playerList: any;
}
