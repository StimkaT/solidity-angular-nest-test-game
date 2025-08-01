import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {
  GameLayoutComponent
} from '../../components/game-layout/game-layout.component';
import {Store} from '@ngrx/store';
import {getPlayer} from '../../+state/auth/auth.selectors';
import {AsyncPipe} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {
  closeWebSocketConnection,
  getDataGameAndSetWebSocket, joinGame,
  leaveGame
} from '../../+state/game-data/game-data.actions';
import {selectActiveGameData} from '../../+state/game-data/game-data.selectors';
import {
  RockPaperScissorsContainerComponent
} from '../rock-paper-scissors-container/rock-paper-scissors-container.component';
import {IActiveGameList} from '../../+state/game-data/game-data.reducer';

@Component({
  selector: 'app-game-layout-container',
  imports: [
    GameLayoutComponent,
    AsyncPipe,
    RockPaperScissorsContainerComponent
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
        this.store.dispatch(leaveGame());
      }
      this.router.navigate(['/']);
    } else if (event.event === 'GameLayoutComponent:observe') {
      this.store.dispatch(leaveGame())
    } else if (event.event === 'GameLayoutComponent:connect') {
      this.store.dispatch(joinGame())
    } else if (event.event === 'GameLayoutComponent:home') {
      this.router.navigate([`/game-list/${event.title.toLowerCase()}`]);
    }
  }

  ngOnDestroy() {
    this.store.dispatch(leaveGame())
    this.store.dispatch(closeWebSocketConnection({gameId: this.idGame!}))
  }
}
