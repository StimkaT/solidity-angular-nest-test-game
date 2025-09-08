import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectRoundsViewData } from '../../+state/rps-game/rps-game.selectors';
import { AsyncPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-rounds-statistics',
  imports: [AsyncPipe, MatIconModule],
  standalone: true,
  templateUrl: './rounds-statistics.component.html',
  styleUrl: './rounds-statistics.component.scss',
})
export class RoundsStatisticsComponent {
  private store = inject(Store);

  roundsViewData$ = this.store.select(selectRoundsViewData);
}
