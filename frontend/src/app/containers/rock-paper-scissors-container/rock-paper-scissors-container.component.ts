import {Component, EventEmitter, Input, Output} from '@angular/core';
import {RockPaperScissorsComponent} from '../../components/rock-paper-scissors/rock-paper-scissors.component';
import {IActiveGameList} from '../../+state/game-data/game-data.reducer';
import {
  PlayersStatusTableContainerComponent
} from '../players-status-table-container/players-status-table-container.component';
import {LoaderComponent} from '../../components/loader/loader.component';
import {TimerComponent} from '../../components/timer/timer.component';

@Component({
  selector: 'app-rock-paper-scissors-container',
  imports: [
    RockPaperScissorsComponent,
    PlayersStatusTableContainerComponent,
    LoaderComponent,
    TimerComponent,
  ],
  standalone: true,
  templateUrl: './rock-paper-scissors-container.component.html',
  styleUrl: './rock-paper-scissors-container.component.scss'
})
export class RockPaperScissorsContainerComponent {
  @Input() gameData!: IActiveGameList;
  @Output() emitter = new EventEmitter();

  events(event: any) {
    if(event.event === 'RockPaperScissorsComponent:someEvents') {
    } else {
      this.emitter.emit(event);
    }
  }
}
