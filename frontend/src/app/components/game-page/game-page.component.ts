import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PlayerProfileComponent} from '../player-profile/player-profile.component';
import {MultiselectComponent} from '../multiselect/multiselect.component';
import {ButtonComponent} from '../button/button.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {IPlayer} from '../../+state/game-data/game-data.reducer';

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [
    PlayerProfileComponent,
    MultiselectComponent,
    ButtonComponent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
  ],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.scss'
})
export class GamePageComponent {
  @Input() playerList: IPlayer[] = [];
  @Input() gameData: any;
  @Input() infoList: any;
  @Input() gameDataAddress: any;

  @Output() emitter = new EventEmitter();

  events(event: any) {
    if (event.data === 'Start') {
      const message = {
        event: event.event,
        data:event.data,
        gameData: this.gameData
      }
      this.emitter.emit(message)
    } else if (event.data === 'Finish') {
      const message = {
        event: event.event,
        data: event.data,
        gameData: this.gameDataAddress,
      }
      this.emitter.emit(message)
    }
  }

}
