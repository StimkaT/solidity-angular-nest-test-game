import { Component, inject} from '@angular/core';
import { Store } from '@ngrx/store';
import {setChoiceGame} from '../../+state/game-data/game-data.actions';
import {AsyncPipe, NgOptimizedImage} from '@angular/common';
import {TimerComponent} from '../../components/timer/timer.component';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {RoundsStatisticsComponent} from '../../components/rounds-statistics/rounds-statistics.component';
import {selectActiveGameData} from '../../+state/game-data/game-data.selectors';

@Component({
  selector: 'app-rock-paper-scissors-game',
  imports: [
    NgOptimizedImage,
    TimerComponent,
    AsyncPipe,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    RoundsStatisticsComponent,
  ],
  standalone: true,
  templateUrl: './rock-paper-scissors-game.component.html',
  styleUrl: './rock-paper-scissors-game.component.scss'
})
export class RockPaperScissorsGameComponent {
  private store = inject(Store);

  selectActiveGameData$ = this.store.select(selectActiveGameData);

  gameElements = [
    {
      icon: 'sports_mma',
      check: null,
      name: 'Rock',
      eventText: '1',
    },
    {
      icon: 'content_cut',
      check: false,
      name: 'Scissors',
      eventText: '2',
    },
    {
      icon: 'insert_drive_file',
      check: true,
      name: 'Paper',
      eventText: '3',
    },
  ];

  event(note: string) {
    this.store.dispatch(setChoiceGame({ result: note }));
  }
}
