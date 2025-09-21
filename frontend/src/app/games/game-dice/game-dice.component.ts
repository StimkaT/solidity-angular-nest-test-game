import {Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {DiceComponent} from './components/dice/dice.component';
import {AsyncPipe} from '@angular/common';
import {
  PlayerListInGameContainerComponent
} from '../../containers/player-list-in-game-container/player-list-in-game-container.component';
import {
  PlayersStatusTableContainerComponent
} from '../../containers/players-status-table-container/players-status-table-container.component';
import {RoundsStatisticsComponent} from '../../components/rounds-statistics/rounds-statistics.component';
import {StatisticButtonComponent} from '../../components/statistic-button/statistic-button.component';
import {WinnerComponent} from '../../components/winner/winner.component';
import {Store} from '@ngrx/store';
import {selectActiveGameData, selectNameWinner} from '../../+state/game-data/game-data.selectors';
import {makeActionWithoutData} from '../../+state/game-data/game-data.actions';
import {RockPaperScissorsComponent} from '../../components/rock-paper-scissors/rock-paper-scissors.component';
import {
  selectDiceDataRound,
  selectDiceRoundsViewData
} from '../../+state/dice-game/dice-game.selectors';

@Component({
  selector: 'app-game-dice',
  imports: [
    DiceComponent,
    AsyncPipe,
    PlayerListInGameContainerComponent,
    PlayersStatusTableContainerComponent,
    RoundsStatisticsComponent,
    StatisticButtonComponent,
    WinnerComponent,
    RockPaperScissorsComponent
  ],
  standalone: true,
  templateUrl: './game-dice.component.html',
  styleUrl: './game-dice.component.scss'
})
export class GameDiceComponent implements OnChanges {
  private store = inject(Store)

  @Input() orderOfThrows: any;
  @Input() yourPlay: boolean = false;
  @Output() emitter = new EventEmitter();

  isRotate = false;
  dice1Value = 0;
  dice2Value = 0;
  localYourPlay: boolean = false;

  selectActiveGameData$ = this.store.select(selectActiveGameData);
  selectNameWinner$ = this.store.select(selectNameWinner);
  selectDiceDataRound$ = this.store.select(selectDiceDataRound);
  roundsViewData$ = this.store.select(selectDiceRoundsViewData);

  ngOnChanges(changes: SimpleChanges) {
    if (changes['yourPlay']) {
      this.localYourPlay = this.yourPlay;
    }
    if (changes['orderOfThrows'] && this.orderOfThrows && this.orderOfThrows.diceCounts && Array.isArray(this.orderOfThrows.diceCounts)) {
      this.dice1Value = this.orderOfThrows.diceCounts[0] || 0;
      this.dice2Value = this.orderOfThrows.diceCounts[1] || 0;
    }
  }

  roll() {
    this.store.dispatch(makeActionWithoutData());
    this.localYourPlay = false;
  }
}
