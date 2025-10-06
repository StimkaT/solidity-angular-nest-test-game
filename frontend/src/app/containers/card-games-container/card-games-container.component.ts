import {Component, inject, OnInit} from '@angular/core';
import {CardGameComponent} from '../../components/card-game/card-game.component';
import {Store} from '@ngrx/store';
import {getGameList, selectGameTypes} from '../../+state/game-data/game-data.selectors';
import {getGameTypes} from '../../+state/game-data/game-data.actions';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {combineLatestWith} from 'rxjs/operators';
import {IGameList} from '../../+state/game-data/game-data.reducer';

@Component({
  selector: 'app-card-games-container',
  imports: [
    CardGameComponent,
  ],
  standalone: true,
  templateUrl: './card-games-container.component.html',
  styleUrl: './card-games-container.component.scss'
})
export class CardGamesContainerComponent implements OnInit {
  private store = inject(Store);
  private router = inject(Router);

  gameTypes: any = [];
  activeGameDataList: IGameList[] = [];

  gameDataList$: Observable<IGameList[]> = this.store.select(getGameList);

  constructor() {
    this.store.select(selectGameTypes).pipe(
      combineLatestWith(this.gameDataList$)
    ).subscribe(([gameTypes, gameList]) => {
      this.gameTypes = gameTypes;
      this.updateActiveGameDataList(gameList);
    });
  }

  ngOnInit() {
    this.store.dispatch(getGameTypes());
  }

  updateActiveGameDataList(gameList: IGameList[]) {
    this.activeGameDataList = gameList.filter(game => {
      return this.gameTypes.some((type: any) => type.name === game.linkGame);
    });
  }

  navigateTo(link: string) {
    this.router.navigate([`/game-list/${link}`]);
  }
}
