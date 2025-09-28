import {Component, inject, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {getActiveGames, joinGame, leaveGame} from '../../+state/game-data/game-data.actions';
import {
  createGameIsLoaded,
  createGameIsLoading, getBalanceData,
  selectActiveGames, selectActiveGamesFinished,
  selectActiveGamesInProgress,
  selectActiveGamesWaitPlayers
} from '../../+state/game-data/game-data.selectors';
import {CreateGameFormContainerComponent} from '../create-game-form-container/create-game-form-container.component';
import {ActiveGameListComponent} from '../../components/active-game-list/active-game-list.component';
import {AsyncPipe} from '@angular/common';
import {getPlayer} from '../../+state/auth/auth.selectors';
import {MatTabsModule} from '@angular/material/tabs';
import {LoaderComponent} from '../../components/loader/loader.component';

@Component({
  selector: 'app-active-game-list-container',
  imports: [
    ActiveGameListComponent,
    AsyncPipe,
    MatTabsModule,
    LoaderComponent
  ],
  standalone: true,
  templateUrl: './active-game-list-container.component.html',
  styleUrl: './active-game-list-container.component.scss'
})
export class ActiveGameListContainerComponent implements OnInit {
  private store = inject(Store);
  private route = inject(ActivatedRoute);
  private dialog = inject(MatDialog);
  private router = inject(Router);

  gameType = '';

  selectActiveGames$ = this.store.select(selectActiveGames);
  selectActiveGamesWaitPlayers$ = this.store.select(selectActiveGamesWaitPlayers);
  selectActiveGamesInProgress$ = this.store.select(selectActiveGamesInProgress);
  selectActiveGamesFinished$ = this.store.select(selectActiveGamesFinished);
  getPlayer$ = this.store.select(getPlayer);
  createGameIsLoading$ = this.store.select(createGameIsLoading);
  createGameIsLoaded$ = this.store.select(createGameIsLoaded);
  getBalanceData$ = this.store.select(getBalanceData);

  constructor() {
    this.gameType = this.route.snapshot.paramMap.get('game-type') || '';
  }

  ngOnInit() {
    this.store.dispatch(getActiveGames({game: this.gameType}))
  }

  events(event: any) {
    if (event.event === 'ActiveGameListComponent:create') {
      this.openCreateGameModal()
    } else if (event.event === 'ActiveGameListComponent:join') {
      this.store.dispatch(joinGame())
    } else if (event.event === 'ActiveGameListComponent:open-tab') {
      this.router.navigate([`/game/${event.gameId}`]);
    } else if (event.event === 'ActiveGameListComponent:reload') {
      this.store.dispatch(getActiveGames({ game: event.title }))
    } else if (event.event === 'ActiveGameListComponent:home') {
      this.router.navigate([`/`]);
    } else if (event.event === 'ActiveGameListComponent:observe') {
      this.router.navigate([`/${event.title.toLowerCase()}/${event.gameId}`]);
    } else if (event.event === 'ActiveGameListComponent:delete') {
      this.router.navigate(['/']);
    } else if (event.event === 'ActiveGameListComponent:disconnect') {
      this.store.dispatch(leaveGame())
      this.store.dispatch(getActiveGames({ game: event.title }))
    }
  }

  openCreateGameModal(): void {
    this.dialog.open(CreateGameFormContainerComponent, {
      width: '60%',
      height: '40%',
      hasBackdrop: true,
      data: { gameType: this.gameType }
    });
  }
}
