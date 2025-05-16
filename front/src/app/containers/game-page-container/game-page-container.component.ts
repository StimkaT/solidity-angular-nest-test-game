import {Component, inject} from '@angular/core';
import {selectPlayerList} from '../../+state/game-data/game-data.selectors';
import {Store} from '@ngrx/store';
import {GamePageComponent} from '../../components/game-page/game-page.component';
import {AsyncPipe} from '@angular/common';
import {loadGameData} from '../../+state/game-data/game-data.actions';

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

  events(event: any) {
    if (event.event === 'ButtonComponent:CLICK') {
      if (event.note === 'Start') {
        this.store.dispatch(loadGameData({data: 'hie'}));
      }
    }
  }
}
