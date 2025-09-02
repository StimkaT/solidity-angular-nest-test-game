import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { setChoiceGame } from '../../+state/game-data/game-data.actions';
import { selectRpsGameDataRounds } from '../../+state/rps-game/rps-game.selectors';
import {AsyncPipe, NgOptimizedImage} from '@angular/common';
import { Subscription } from 'rxjs';
import {IRoundResult} from '../../+state/rps-game/rps-game.reducer';

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

  //TODO: разобраться как работает В OnInit
  roundsData: (IRoundResult & { playerMap: Record<string, string | undefined> })[] = [];

  ngOnInit() {
    console.log('roundsData', this.roundsData)
    this.subscription = this.rounds$.subscribe(rounds => {
      this.playerList = rounds.gamePlayers;
      this.roundsData = rounds.roundsData.map(round => ({
        ...round,
        playerMap: Object.fromEntries(
          round.players.map(p => [p.wallet, p.choice])
        )
      }));
    });
  }

  event(note: string) {
    this.store.dispatch(setChoiceGame({ result: note }));
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
