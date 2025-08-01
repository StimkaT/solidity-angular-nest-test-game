import {Component, inject, OnInit} from '@angular/core';
import {CardGameComponent} from '../../components/card-game/card-game.component';
import {Store} from '@ngrx/store';
import {selectGameTypes} from '../../+state/game-data/game-data.selectors';
import {getGameTypes} from '../../+state/game-data/game-data.actions';
import {Router} from '@angular/router';

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
  activeGameDataList: any = [];

  constructor() {
    this.store.select(selectGameTypes).subscribe((data) => {
      this.gameTypes = data
      this.updateActiveGameDataList()
    })
  }

  ngOnInit() {
    this.store.dispatch(getGameTypes());
  }


  updateActiveGameDataList() {
    this.activeGameDataList = this.gameDataList.filter(game => {
      return this.gameTypes.some((type: any) => type.name === game.linkGame);
    });
  }

  gameDataList = [
    {
      iconList: [
        'pan_tool',
        'content_cut',
        'description'
      ],
      title: 'Rock-Paper-Scissors',
      linkGame: 'rock-paper-scissors'
    },
    {
      iconList: [
        'casino'
      ],
      title: 'Dice',
      linkGame: 'dice'
    },
  ];

  navigateTo(link: string) {
    this.router.navigate([`/game-list/${link}`]);
  }
}
