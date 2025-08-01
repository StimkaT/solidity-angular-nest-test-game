import {Component, Input} from '@angular/core';
import {RockPaperScissorsComponent} from '../../components/rock-paper-scissors/rock-paper-scissors.component';
import {IActiveGameList} from '../../+state/game-data/game-data.reducer';

@Component({
  selector: 'app-rock-paper-scissors-container',
  imports: [
    RockPaperScissorsComponent,
  ],
  standalone: true,
  templateUrl: './rock-paper-scissors-container.component.html',
  styleUrl: './rock-paper-scissors-container.component.scss'
})
export class RockPaperScissorsContainerComponent {
  @Input() gameData!: IActiveGameList;
}
