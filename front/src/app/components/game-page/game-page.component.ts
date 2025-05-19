import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {PlayerProfileComponent} from '../player-profile/player-profile.component';
import {MultiselectComponent} from '../multiselect/multiselect.component';
import {ButtonComponent} from '../button/button.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {IPlayer} from '../../+state/game-data/game-data.reducer';
import {ethers} from 'ethers';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

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
    MatProgressSpinnerModule

  ],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.scss'
})
export class GamePageComponent implements OnChanges {
  @Input() playerList: IPlayer[] = [];
  @Input() activePlayerList: string[] = [];
  @Input() gameData: any = {
    bank: 1,
    currency: 'SepoliaETH',
    id: '1233',
    players: [
      { id: 'p1', wallet: '0x...', amount: '10', ready: true },
      { id: 'p2', wallet: '0x...123213', amount: '4324', ready: false }
    ],
  };
  @Input() infoList: any = [
    {
      title: 'launchTime',
      data: '11.11.2025, 13:35:00'
    },
    {
      title: 'startTime',
      data: '11.11.2025, 13:35:00'
    },
    {
      title: 'finishTime',
      data: '11.11.2025, 13:35:00'
    },
    {
      title: 'gasForContractStart',
      data: 0.005
    },
    {
      title: 'gasForContractFinish',
      data: 0.005
    },
    {
      title: 'gasForTransactions',
      data: 5
    },
    {
      title: 'Player 1 received:',
      data: 33.033
    },
    {
      title: 'Player 2 received:',
      data: 44.001
    },
    {
      title: 'Player 3 received:',
      data: 0.101
    }
  ];
  @Input() gameDataAddress: any;

  @Output() emitter = new EventEmitter();

  activePlayerListData: IPlayer[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['playerList'] || changes['activePlayerList']) {
      this.updateActivePlayerListData();
    }
  }

  async updateActivePlayerListData(): Promise<void> {
    if (this.playerList && this.activePlayerList) {
      const activePlayers = this.playerList.filter(player =>
        this.activePlayerList.includes(player.address)
      );

      const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545');

      // Для каждого игрока получаем баланс
      const playersWithBalance = await Promise.all(
        activePlayers.map(async player => {
          try {
            const balanceBigInt = await provider.getBalance(player.address);
            const balance = Number(ethers.formatEther(balanceBigInt));
            return { ...player, balance };
          } catch (error) {
            console.error(`Ошибка при получении баланса для ${player.address}:`, error);
            return { ...player, balance: null };
          }
        })
      );
      console.log('playersWithBalance', playersWithBalance)
      this.activePlayerListData = playersWithBalance;
    }
  }

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
