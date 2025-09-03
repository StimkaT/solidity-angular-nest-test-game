import { Component, inject} from '@angular/core';
import { Store } from '@ngrx/store';
import {setChoiceGame} from '../../+state/game-data/game-data.actions';
import {AsyncPipe} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {selectActiveGameData} from '../../+state/game-data/game-data.selectors';
import {setActiveGameElements} from '../../+state/rps-game/rps-game.actions';
import {getGameElements} from '../../+state/rps-game/rps-game.selectors';

@Component({
  selector: 'app-rock-paper-scissors-game',
  imports: [
    AsyncPipe,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
  ],
  standalone: true,
  templateUrl: './rock-paper-scissors-game.component.html',
  styleUrl: './rock-paper-scissors-game.component.scss'
})
export class RockPaperScissorsGameComponent {
  private store = inject(Store);

  selectActiveGameData$ = this.store.select(selectActiveGameData);
  getGameElements$ = this.store.select(getGameElements);

  event(data: string) {
    this.store.dispatch(setChoiceGame({ result: data }));
    this.store.dispatch(setActiveGameElements({ data }));

  }
}
