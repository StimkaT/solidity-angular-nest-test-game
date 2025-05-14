import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {PlayerProfileComponent} from './components/player-profile/player-profile.component';
import {ButtonComponent} from './components/button/button.component';
import {MultiselectComponent} from './components/multiselect/multiselect.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PlayerProfileComponent, ButtonComponent, MultiselectComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'front';
}
