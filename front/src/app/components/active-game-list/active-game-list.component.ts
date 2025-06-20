import { Component } from '@angular/core';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-active-game-list',
  imports: [
    MatButton
  ],
  standalone: true,
  templateUrl: './active-game-list.component.html',
  styleUrl: './active-game-list.component.scss'
})
export class ActiveGameListComponent {
  rows = Array.from({ length: 15 });

}
