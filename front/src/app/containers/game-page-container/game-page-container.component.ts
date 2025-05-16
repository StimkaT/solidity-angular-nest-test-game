import {Component, inject} from '@angular/core';
import {
  selectGameDataAddress,
  selectPlayerList, selectSelectedPlayerList
} from '../../+state/game-data/game-data.selectors';
import {Store} from '@ngrx/store';
import {GamePageComponent} from '../../components/game-page/game-page.component';
import {AsyncPipe} from '@angular/common';
import {
  getGameData,
  loadGameData,
  setSelectedPlayerList
} from '../../+state/game-data/game-data.actions';

@Component({
  selector: 'app-game-page-container',
  standalone: true,
  imports: [
    GamePageComponent,
    AsyncPipe
  ],
  templateUrl: './game-page-container.component.html',
  styleUrl: './game-page-container.component.scss'
})
export class GamePageContainerComponent {
  private store = inject(Store);

  playerList$ = this.store.select(selectPlayerList);
  selectSelectedPlayerList$ = this.store.select(selectSelectedPlayerList);
  selectGameDataAddress$ = this.store.select(selectGameDataAddress);

  events(event: any) {
    if (event.event === 'ButtonComponent:CLICK') {
      console.log(event)
      if (event.data === 'Start') {
        this.store.dispatch(loadGameData({data: event.gameData}));
      }
      if (event.data === 'Finish') {
        this.store.dispatch(getGameData({data: event.gameData}));
      }
    } else if (event.event === 'MultiselectComponent:CHANGE') {
      this.store.dispatch(setSelectedPlayerList({selectedPlayerList: event.data}));
    }
  }
}
