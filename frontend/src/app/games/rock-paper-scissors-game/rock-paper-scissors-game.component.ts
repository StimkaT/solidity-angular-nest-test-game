import {Component, inject, Input} from '@angular/core';
import {Store} from '@ngrx/store';
import {setChoiceGame} from '../../+state/game-data/game-data.actions';

@Component({
  selector: 'app-rock-paper-scissors-game',
  imports: [],
  standalone: true,
  templateUrl: './rock-paper-scissors-game.component.html',
  styleUrl: './rock-paper-scissors-game.component.scss'
})
export class RockPaperScissorsGameComponent {
  @Input() playerList: any = [
    {
      wallet: 'First3',
      selected: '',
      chose: true,
    },
    {
      wallet: 'First2',
      selected: '',
      chose: true,
    },
    {
      wallet: 'First1',
      selected: '',
      chose: true,
    },
    {
      wallet: 'rock',
      selected: '1',
      chose: true,
    },
    {
      wallet: 'scissors',
      selected: '2',
      chose: true,
    },
    {
      wallet: 'scissors32',
      selected: '0',
      chose: true,
    },
    {
      wallet: 'paper',
      selected: '3',
      chose: true,
    }
  ];

  private store = inject(Store);

  event(note: string) {
    this.store.dispatch(setChoiceGame({result: note}))
  }
}
