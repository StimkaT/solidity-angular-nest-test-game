import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {RockPaperScissorsComponent} from '../../components/rock-paper-scissors/rock-paper-scissors.component';
import {IActiveGameList} from '../../+state/game-data/game-data.reducer';
import {
  PlayersStatusTableContainerComponent
} from '../players-status-table-container/players-status-table-container.component';
import {TimerComponent} from '../../components/timer/timer.component';
import {getTimer} from '../../+state/game-data/game-data.selectors';
import {Store} from '@ngrx/store';
import {AsyncPipe} from '@angular/common';
import {setTimer} from '../../+state/game-data/game-data.actions';
import {RockPaperScissorsGameComponent} from '../../games/rock-paper-scissors-game/rock-paper-scissors-game.component';

@Component({
  selector: 'app-rock-paper-scissors-container',
  imports: [
    RockPaperScissorsComponent,
    PlayersStatusTableContainerComponent,
    TimerComponent,
    AsyncPipe,
    RockPaperScissorsGameComponent,
  ],
  standalone: true,
  templateUrl: './rock-paper-scissors-container.component.html',
  styleUrl: './rock-paper-scissors-container.component.scss'
})
export class RockPaperScissorsContainerComponent {
  @Input() gameData!: IActiveGameList;
  @Output() emitter = new EventEmitter();

  private store = inject(Store);
  getTimer$ = this.store.select(getTimer)

  events(event: any) {
    if(event.event === 'RockPaperScissorsComponent:someEvents') {
    } else {
      this.emitter.emit(event);
    }
    if(event.event === 'TimerComponent:clearTimer') {
      this.store.dispatch(setTimer({second: 0, title: ''}))
    }
  }
}
