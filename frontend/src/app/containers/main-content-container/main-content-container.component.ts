import { Component } from '@angular/core';
import {MainContentComponent} from '../../components/main-content/main-content.component';

@Component({
  selector: 'app-main-content-container',
  imports: [
    MainContentComponent
  ],
  standalone: true,
  templateUrl: './main-content-container.component.html',
  styleUrl: './main-content-container.component.scss'
})
export class MainContentContainerComponent {
}
