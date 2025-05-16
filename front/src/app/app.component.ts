import { Component } from '@angular/core';
import {GamePageContainerComponent} from './containers/game-page-container/game-page-container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    GamePageContainerComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'front';
}
