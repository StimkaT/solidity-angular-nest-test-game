import {Component, Input} from '@angular/core';
import {PlayersListInGameComponent} from '../../components/players-list-in-game/players-list-in-game.component';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-player-list-in-game-container',
  imports: [
    PlayersListInGameComponent,
    AsyncPipe
  ],
  standalone: true,
  templateUrl: './player-list-in-game-container.component.html',
  styleUrl: './player-list-in-game-container.component.scss'
})
export class PlayerListInGameContainerComponent {
  @Input() dataRound: any;
}
