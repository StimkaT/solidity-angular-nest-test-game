import { Component } from '@angular/core';
import {MainContainerComponent} from './containers/main-container/main-container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MainContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
