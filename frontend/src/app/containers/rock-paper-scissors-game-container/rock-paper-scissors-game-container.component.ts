import { Component } from '@angular/core';
import {
  RockPaperScissorsGameComponent
} from '../../components/rock-paper-scissors-game/rock-paper-scissors-game.component';

@Component({
  selector: 'app-rock-paper-scissors-game-container',
  imports: [
    RockPaperScissorsGameComponent
  ],
  standalone: true,
  templateUrl: './rock-paper-scissors-game-container.component.html',
  styleUrl: './rock-paper-scissors-game-container.component.scss'
})
export class RockPaperScissorsGameContainerComponent {

}
