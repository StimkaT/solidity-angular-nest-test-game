import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {RockPaperScissorsComponent} from '../../components/rock-paper-scissors/rock-paper-scissors.component';
import {IActiveGameList} from '../../+state/game-data/game-data.reducer';
import {
  PlayersStatusTableContainerComponent
} from '../players-status-table-container/players-status-table-container.component';
import {RockPaperScissorsGameComponent} from '../../games/rock-paper-scissors-game/rock-paper-scissors-game.component';
import {Store} from '@ngrx/store';
import {selectActiveGameData} from '../../+state/game-data/game-data.selectors';
import {AsyncPipe} from '@angular/common';
import {RoundsStatisticsComponent} from '../../components/rounds-statistics/rounds-statistics.component';
import {WinnerComponent} from '../../components/winner/winner.component';
import {PlayersListInGameComponent} from '../../components/players-list-in-game/players-list-in-game.component';
import {StatisticButtonComponent} from '../../components/statistic-button/statistic-button.component';

@Component({
  selector: 'app-rock-paper-scissors-container',
  imports: [
    RockPaperScissorsComponent,
    PlayersStatusTableContainerComponent,
    RockPaperScissorsGameComponent,
    AsyncPipe,
    RoundsStatisticsComponent,
    WinnerComponent,
    PlayersListInGameComponent,
    StatisticButtonComponent,
  ],
  standalone: true,
  templateUrl: './rock-paper-scissors-container.component.html',
  styleUrl: './rock-paper-scissors-container.component.scss'
})
export class RockPaperScissorsContainerComponent {
  @Input() gameData!: IActiveGameList;
  @Output() emitter = new EventEmitter();
  nameWinner = '';

  private store = inject(Store)
  selectActiveGameData$ = this.store.select(selectActiveGameData);
  events(event: any) {
    if(event.event === 'RockPaperScissorsComponent:someEvents') {
    } else {
      this.emitter.emit(event);
    }
  }
}
