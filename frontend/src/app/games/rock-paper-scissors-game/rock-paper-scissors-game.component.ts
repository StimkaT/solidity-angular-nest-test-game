import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {setChoiceGame, setTimer} from '../../+state/game-data/game-data.actions';
import { selectRpsGameDataRounds } from '../../+state/rps-game/rps-game.selectors';
import {AsyncPipe, NgOptimizedImage} from '@angular/common';
import { Subscription } from 'rxjs';
import { IRoundResult } from '../../+state/rps-game/rps-game.reducer';
import {getTimer, selectActiveGameData} from '../../+state/game-data/game-data.selectors';
import {TimerComponent} from '../../components/timer/timer.component';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {RoundsStatisticsComponent} from '../../components/rounds-statistics/rounds-statistics.component';

@Component({
  selector: 'app-rock-paper-scissors-game',
  imports: [
    NgOptimizedImage,
    TimerComponent,
    AsyncPipe,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    RoundsStatisticsComponent,
  ],
  standalone: true,
  templateUrl: './rock-paper-scissors-game.component.html',
  styleUrl: './rock-paper-scissors-game.component.scss'
})
export class RockPaperScissorsGameComponent implements OnInit, OnDestroy {
  private store = inject(Store);
  private subscription!: Subscription;

  rounds$ = this.store.select(selectRpsGameDataRounds);
  selectActiveGameData$ = this.store.select(selectActiveGameData);
  getTimer$ = this.store.select(getTimer)
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

  events(event: any) {
    if(event.event === 'TimerComponent:clearTimer') {
      this.store.dispatch(setTimer({second: 0, title: ''}))
    }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
