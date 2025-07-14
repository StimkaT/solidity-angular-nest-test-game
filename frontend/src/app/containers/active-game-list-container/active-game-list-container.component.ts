import {Component, inject, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {getActiveGames, joinGame} from '../../+state/game-data/game-data.actions';
import {selectActiveGames} from '../../+state/game-data/game-data.selectors';
import {CreateGameFormContainerComponent} from '../create-game-form-container/create-game-form-container.component';
import {ActiveGameListComponent} from '../../components/active-game-list/active-game-list.component';
import {AsyncPipe} from '@angular/common';
import {getPlayer} from '../../+state/auth/auth.selectors';

@Component({
  selector: 'app-active-game-list-container',
  imports: [
    ActiveGameListComponent,
    AsyncPipe
  ],
  standalone: true,
  templateUrl: './active-game-list-container.component.html',
  styleUrl: './active-game-list-container.component.scss'
})
export class ActiveGameListContainerComponent implements OnInit {
  title: string = '';
  link: string = '';

  private store = inject(Store);
  private route = inject(ActivatedRoute);
  private dialog = inject(MatDialog);
  private router = inject(Router);

  constructor() {
    this.route.queryParams.subscribe(params => {
      this.title = params['title'];
      this.link = params['link'];
    });
  }

  ngOnInit() {
    this.store.dispatch(getActiveGames({game: this.title}))
  }

  selectActiveGames$ = this.store.select(selectActiveGames);
  getPlayer$ = this.store.select(getPlayer);

  events(event: any) {
    if (event.event === 'ActiveGameListComponent:create') {
      this.openCreateGameModal()
    } else if (event.event === 'ActiveGameListComponent:join') {
      this.store.dispatch(joinGame({game: event.gameId, wallet: event.wallet, gameName: event.title}))
    } else if (event.event === 'ActiveGameListComponent:reload') {
      this.store.dispatch(getActiveGames({ game: event.title }))
    } else if (event.event === 'ActiveGameListComponent:home') {
      this.router.navigate([`/${event.title.toLowerCase()}`]);
    }else if (event.event === 'ActiveGameListComponent:observe') {
      this.router.navigate([`/${event.title.toLowerCase()}/:${event.gameId}`]);
    }else if (event.event === 'ActiveGameListComponent:delete') {
      this.router.navigate(['/']);
    }
  }

  openCreateGameModal(): void {
    const dialogRef = this.dialog.open(CreateGameFormContainerComponent, {
      width: '60%',
      height: '40%',
      hasBackdrop: true,
    });
  }
}
