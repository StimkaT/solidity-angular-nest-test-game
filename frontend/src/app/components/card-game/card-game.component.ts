import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {IGameList} from '../../+state/game-data/game-data.reducer';

@Component({
  selector: 'app-card-game',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './card-game.component.html',
  styleUrls: ['./card-game.component.scss']
})
export class CardGameComponent {
  @Input() game: IGameList = {
    iconList: [],
    title: '',
    linkGame: ''
  };
}
