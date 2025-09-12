import {Component, Input} from '@angular/core';
import {PlayersListInGameComponent} from '../../components/players-list-in-game/players-list-in-game.component';

@Component({
  selector: 'app-player-list-in-game-container',
  imports: [
    PlayersListInGameComponent,
  ],
  standalone: true,
  templateUrl: './player-list-in-game-container.component.html',
  styleUrl: './player-list-in-game-container.component.scss'
})
export class PlayerListInGameContainerComponent {
  @Input() dataRound: any;
  @Input() activePlayer: any;
}
