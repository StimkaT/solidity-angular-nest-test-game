import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PlayerProfileComponent} from '../player-profile/player-profile.component';
import {MultiselectComponent} from '../multiselect/multiselect.component';
import {ButtonComponent} from '../button/button.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';

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
    MatCardModule
  ],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.scss'
})
export class GamePageComponent {
  @Input() playerList: any;
  @Input() gameData: any = {
    bank: 1,
    currency: 'SepoliaETH'
  };
  @Input() infoList: any = [
    {
      title: 'first',
      data: 123123
    },
    {
      title: 'second',
      data: 55
    },
    {
      title: 'third',
      data: 120000
    },
  ];

  @Output() emitter = new EventEmitter();

  events(event: any) {
    const message = {
      event: event.event,
      data: this.infoList,
      note: event.data
    }
    this.emitter.emit(message)
  }
}
