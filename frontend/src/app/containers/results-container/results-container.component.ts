import {Component, inject, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {MatDialogRef} from '@angular/material/dialog';
import {selectActiveGameData, selectNameWinner} from '../../+state/game-data/game-data.selectors';
import {getPlayer} from '../../+state/auth/auth.selectors';
import {filter} from 'rxjs';
import {map} from 'rxjs/operators';
import {AsyncPipe} from '@angular/common';
import {DurationFormatPipe} from '../../pipes/duration-format.pipe';

@Component({
  selector: 'app-results-container',
  imports: [
    AsyncPipe,
    DurationFormatPipe
  ],
  standalone: true,
  templateUrl: './results-container.component.html',
  styleUrl: './results-container.component.scss'
})
export class ResultsContainerComponent implements OnInit{
  private store = inject(Store);
  result: number | null | undefined;

  selectNameWinner$ = this.store.select(selectNameWinner);
  selectActiveGameData$ = this.store.select(selectActiveGameData);

  constructor(
    public dialogRef: MatDialogRef<ResultsContainerComponent>,
  ) {}

  playerResult$ = this.store.select(selectActiveGameData).pipe(
    filter(gameData => !!gameData),
    map(gameData => {
      return this.store.select(getPlayer).pipe(
        filter(player => !!player),
        map(player => {
          const playerData = gameData!.players.find(p => p.wallet === player!.wallet);
          return playerData?.win;
        })
      );
    })
  );

  ngOnInit() {
    this.store.select(selectActiveGameData).subscribe(gameData => {
      if (!gameData) return;

      this.store.select(getPlayer).subscribe(player => {
        if (!player) return;

        const playerData = gameData.players.find(p => p.wallet === player.wallet);
        this.result = playerData?.win;
      });
    });
  }

  close() {
    this.dialogRef.close();
  }

  calculateDuration(createdAt?: string | Date | number | null, finishedAt?: string | Date | number | null): number {
    if (!createdAt || !finishedAt) return 0;

    const start = new Date(createdAt).getTime();
    const end = new Date(finishedAt).getTime();

    return (end - start) / 1000;
  }
}
