import {Component, inject, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {selectActiveGameData} from '../../+state/game-data/game-data.selectors';
import {getPlayer} from '../../+state/auth/auth.selectors';
import {filter} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-results-container',
    imports: [],
  standalone: true,
  templateUrl: './results-container.component.html',
  styleUrl: './results-container.component.scss'
})
export class ResultsContainerComponent implements OnInit{
  private store = inject(Store);
  result: number | null | undefined;

  constructor(
    public dialogRef: MatDialogRef<ResultsContainerComponent>,
    public dialog: MatDialog
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
}
