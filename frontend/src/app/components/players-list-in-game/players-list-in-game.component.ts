import {Component, Input} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';

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
  @Input() gameFlow!: any;
  @Input() activePlayer: any;
}
