import { Component, Input } from '@angular/core';
import { IActiveGameList } from '../../+state/game-data/game-data.reducer';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-rock-paper-scissors',
  imports: [ DatePipe],
  standalone: true,
  templateUrl: './rock-paper-scissors.component.html',
  styleUrl: './rock-paper-scissors.component.scss',
})
export class RockPaperScissorsComponent {
  @Input() gameData!: IActiveGameList;
}
