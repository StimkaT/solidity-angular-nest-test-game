import {Component, inject} from '@angular/core';
import {PlayersStatusTableComponent} from '../../components/players-status-table/players-status-table.component';
import {selectActiveGameData} from '../../+state/game-data/game-data.selectors';
import {Store} from '@ngrx/store';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-players-status-table-container',
  imports: [
    PlayersStatusTableComponent,
    AsyncPipe
  ],
  standalone: true,
  templateUrl: './players-status-table-container.component.html',
  styleUrl: './players-status-table-container.component.scss'
})
export class PlayersStatusTableContainerComponent {
  private store = inject(Store);

  selectActiveGameData$ = this.store.select(selectActiveGameData);
}
