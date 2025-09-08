import {Component, Input} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {IRoundResult} from '../../+state/rps-game/rps-game.reducer';

@Component({
  selector: 'app-players-list-in-game',
  imports: [
    MatIconModule
  ],
  standalone: true,
  templateUrl: './players-list-in-game.component.html',
  styleUrl: './players-list-in-game.component.scss'
})
export class PlayersListInGameComponent {
  @Input() gameFlow!: IRoundResult;
}
