import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-players-list-in-game',
  imports: [
    MatIconModule
  ],
  standalone: true,
  templateUrl: './players-list-in-game.component.html',
  styleUrl: './players-list-in-game.component.scss'
})
export class PlayersListInGameComponent {
  playerList = [
    {
      name: 'Игорь1',
      photo: 'person_outline',
      result: 'question_mark',
      resultType: 'icon',
      wallet: '322-1',
      choice: 'not-ready'
    },
    {
      name: 'Игорь2',
      photo: 'person_outline',
      result: 'question_mark',
      resultType: 'icon',
      wallet: '322-2',
      choice: 'ready'
    },
    {
      name: 'Игорь2.1',
      photo: 'person_outline',
      result: 'sports_mma',
      resultType: 'icon',
      wallet: '322-2.1',
      choice: 'ready'
    },
    {
      name: 'Игорь3',
      photo: 'person_outline',
      result: 'content_cut',
      resultType: 'icon',
      wallet: '322-3',
      choice: 'lose',
    },
    {
      name: 'Игорь4',
      photo: 'person_outline',
      result: 'insert_drive_file',
      resultType: 'icon',
      wallet: '322-4',
      choice: 'win',
    },
  ];
}
