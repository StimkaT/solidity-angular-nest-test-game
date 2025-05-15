import { Component } from '@angular/core';
import {PlayerProfileComponent} from './components/player-profile/player-profile.component';
import {ButtonComponent} from './components/button/button.component';
import {MultiselectComponent} from './components/multiselect/multiselect.component';
import {GamePageComponent} from './components/game-page/game-page.component';
import {GamePageContainerComponent} from './containers/game-page-container/game-page-container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    PlayerProfileComponent,
    ButtonComponent,
    MultiselectComponent,
    GamePageComponent,
    GamePageContainerComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'front';
}
