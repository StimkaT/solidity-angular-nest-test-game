import {Component, inject, OnInit} from '@angular/core';
import {
  selectGameData,
  selectGameDataAddress,
  selectPlayerList
} from '../../+state/game-data/game-data.selectors';
import {Store} from '@ngrx/store';
import {GamePageComponent} from '../../components/game-page/game-page.component';
import {AsyncPipe} from '@angular/common';
import {
  getGameData,
  loadGameData, setLaunchTime,
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
export class GamePageContainerComponent implements OnInit {
  private store = inject(Store);

  playerList$ = this.store.select(selectPlayerList);
  selectGameDataAddress$ = this.store.select(selectGameDataAddress);
  selectGameData$ = this.store.select(selectGameData);

  ngOnInit() {
    const currentTime = new Date().toISOString();
    this.store.dispatch(setLaunchTime({ launchTime: currentTime }))
  }

  events(event: any) {
    if (event.event === 'ButtonComponent:CLICK') {
      if (event.data === 'Start') {
        this.store.dispatch(loadGameData({data: event.gameData}));
      }
      if (event.data === 'Finished') {
        this.store.dispatch(getGameData({data: event.gameData}));
      }
    } else if (event.event === 'MultiselectComponent:CHANGE') {
      this.store.dispatch(setSelectedPlayerList({selectedPlayerList: event.data}));
    }
  }
}
