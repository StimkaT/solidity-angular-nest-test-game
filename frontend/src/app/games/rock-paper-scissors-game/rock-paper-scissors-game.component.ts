import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { setChoiceGame } from '../../+state/game-data/game-data.actions';
import { selectRpsGameDataRounds } from '../../+state/rps-game/rps-game.selectors';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { Subscription } from 'rxjs';
import { IRoundResult } from '../../+state/rps-game/rps-game.reducer';

@Component({
  selector: 'app-rock-paper-scissors-game',
  imports: [
    AsyncPipe,
    NgOptimizedImage
  ],
  standalone: true,
  templateUrl: './rock-paper-scissors-game.component.html',
  styleUrl: './rock-paper-scissors-game.component.scss'
})
export class RockPaperScissorsGameComponent implements OnInit, OnDestroy {
  private store = inject(Store);
  private subscription!: Subscription;

  rounds$ = this.store.select(selectRpsGameDataRounds);
  playerList: string[] = [];
  roundsData: (IRoundResult & { playerMap: Record<string, string | undefined> })[] = [];

  ngOnInit() {
    this.subscription = this.rounds$.subscribe(rounds => {
      if (!rounds || !rounds.roundsData) {
        this.playerList = [];
        this.roundsData = [];
        return;
      }

      this.roundsData = rounds.roundsData.map(round => ({
        ...round,
        playerMap: Object.fromEntries(
          round.players.map(p => [p.wallet, p.choice])
        )
      }));

      this.playerList = Array.from(
        new Set(
          this.roundsData.flatMap(round => round.players.map(p => p.wallet))
        )
      );
    });
  }


  event(note: string) {
    this.store.dispatch(setChoiceGame({ result: note }));
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
