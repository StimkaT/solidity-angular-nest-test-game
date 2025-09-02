import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {selectRpsGameDataRounds} from '../../+state/rps-game/rps-game.selectors';
import {AsyncPipe, NgOptimizedImage} from '@angular/common';
import {TimerComponent} from '../timer/timer.component';
import {IRoundResult} from '../../+state/rps-game/rps-game.reducer';
import {setChoiceGame} from '../../+state/game-data/game-data.actions';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-rounds-statistics',
  imports: [
    NgOptimizedImage,
    TimerComponent,
    AsyncPipe,
  ],
  standalone: true,
  templateUrl: './rounds-statistics.component.html',
  styleUrl: './rounds-statistics.component.scss'
})
export class RoundsStatisticsComponent implements OnInit, OnDestroy {
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
