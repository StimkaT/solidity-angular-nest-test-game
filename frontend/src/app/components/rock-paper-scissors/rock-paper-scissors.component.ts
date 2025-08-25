import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IActiveGameList } from '../../+state/game-data/game-data.reducer';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-rock-paper-scissors',
  imports: [MatButton],
  standalone: true,
  templateUrl: './rock-paper-scissors.component.html',
  styleUrl: './rock-paper-scissors.component.scss',
})
export class RockPaperScissorsComponent {
  @Input() gameData!: IActiveGameList;
  @Output() emitter = new EventEmitter();

  sendEvent(event: string) {
    const message = {
      event: `Game:${event}`,
    };
    this.emitter.emit(message);
  }
}
