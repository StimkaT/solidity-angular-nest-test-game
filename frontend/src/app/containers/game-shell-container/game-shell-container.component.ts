import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {
  GameLayoutComponent
} from '../../components/game-layout/game-layout.component';
import {Store} from '@ngrx/store';
import {getPlayer} from '../../+state/auth/auth.selectors';
import {AsyncPipe} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {
  disconnectGame,
  getDataGameAndSetWebSocket, joinGame,
  leaveGame, loseGame, sendMoney, winGame
} from '../../+state/game-data/game-data.actions';
import {selectActiveGameData, selectIsConnectedGame} from '../../+state/game-data/game-data.selectors';
import {
  RockPaperScissorsContainerComponent
} from '../rock-paper-scissors-container/rock-paper-scissors-container.component';
import {IActiveGameList} from '../../+state/game-data/game-data.reducer';
import {GameDiceComponent} from '../../games/game-dice/game-dice.component';

@Component({
  selector: 'app-game-layout-container',
  imports: [
    GameLayoutComponent,
    AsyncPipe,
    RockPaperScissorsContainerComponent,
    GameDiceComponent
  ],
  standalone: true,
  templateUrl: './game-shell-container.component.html',
  styleUrl: './game-shell-container.component.scss'
})
export class GameShellContainerComponent implements OnInit, OnDestroy {
  private store = inject(Store);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  isGameReady = false;
  idGame: number | null = null;
  gameData!: IActiveGameList;

  getPlayer$ = this.store.select(getPlayer);
  selectActiveGameData$ = this.store.select(selectActiveGameData);
  selectIsConnectedGame$ = this.store.select(selectIsConnectedGame);


  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.idGame = id;
    if (id) {
      this.store.dispatch(getDataGameAndSetWebSocket({game: id}))
    }
    this.store.select(selectActiveGameData).subscribe((data) => {
      this.gameData = data;
    })
  }

  events(event: any) {
    if (event.event === 'GameLayoutComponent:leave') {
      if (this.gameData) {
        this.store.dispatch(disconnectGame());
      }
      this.router.navigate(['/']);
    } else if (event.event === 'GameLayoutComponent:observe') {
      this.store.dispatch(leaveGame())
    } else if (event.event === 'GameLayoutComponent:connect') {
      this.store.dispatch(joinGame())
    } else if (event.event === 'GameLayoutComponent:home') {
      this.router.navigate([`/game-list/${event.title.toLowerCase()}`]);
    } else if (event.event === 'Game:pay') {
      this.store.dispatch(sendMoney())
    } else if (event.event === 'Game:win') {
      this.store.dispatch(winGame())
    } else if (event.event === 'Game:lose') {
      this.store.dispatch(loseGame())
    }
  }

  ngOnDestroy() {
    this.store.dispatch(disconnectGame())
    // this.store.dispatch(closeWebSocketConnection({gameId: this.idGame!}))
  }
}
