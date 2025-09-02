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

@Component({
  selector: 'app-rock-paper-scissors-container',
  imports: [
    RockPaperScissorsComponent,
    PlayersStatusTableContainerComponent,
    RockPaperScissorsGameComponent,
    AsyncPipe,
  ],
  standalone: true,
  templateUrl: './rock-paper-scissors-container.component.html',
  styleUrl: './rock-paper-scissors-container.component.scss'
})
export class RockPaperScissorsContainerComponent {
  @Input() gameData!: IActiveGameList;
  @Output() emitter = new EventEmitter();

  private store = inject(Store)
  selectActiveGameData$ = this.store.select(selectActiveGameData);
  events(event: any) {
    if(event.event === 'RockPaperScissorsComponent:someEvents') {
    } else {
      this.emitter.emit(event);
    }
  }
}
