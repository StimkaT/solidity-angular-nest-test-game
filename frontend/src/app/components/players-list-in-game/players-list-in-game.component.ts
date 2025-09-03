import {Component, Input} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {IRoundResult} from '../../+state/rps-game/rps-game.reducer';

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
  @Input() gameFlow!: IRoundResult;

  playerList = [
    {
      wallet: '322-1',
      status: 'notBet',
      typeChoice: 'icon',
      choice: ''
    },
    {
      wallet: '322-1',
      status: 'loser',
      typeChoice: 'icon',
      choice: ''
    },
    {
      wallet: '322-1',
      status: 'notBet',
      typeChoice: 'icon',
      choice: ''
    },
    {
      wallet: '322-1',
      status: 'win',
      typeChoice: 'icon',
      choice: ''
    },
    {
      wallet: '322-1',
      status: 'isBet',
      typeChoice: 'icon',
      choice: ''
    },
    // {
    //   result: 'question_mark',
    //   resultType: 'icon',
    //   wallet: '322-2',
    //   choice: 'ready'
    // },
    // {
    //   result: 'sports_mma',
    //   resultType: 'icon',
    //   wallet: '322-2.1',
    //   choice: 'ready'
    // },
    // {
    //   result: 'content_cut',
    //   resultType: 'icon',
    //   wallet: '322-3',
    //   choice: 'lose',
    // },
    // {
    //   result: 'insert_drive_file',
    //   resultType: 'icon',
    //   wallet: '322-4',
    //   choice: 'notBet',
    // },
  ];
}
