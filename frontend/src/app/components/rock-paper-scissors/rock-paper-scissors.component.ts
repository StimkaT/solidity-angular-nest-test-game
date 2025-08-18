import { Component, EventEmitter, inject, Input, Output, OnInit } from '@angular/core';
import { IActiveGameList } from '../../+state/game-data/game-data.reducer';
import { MatButton } from '@angular/material/button';
import {selectActiveGameData} from '../../+state/game-data/game-data.selectors';
import { Store } from '@ngrx/store';
import { ethers } from 'ethers';
import DelegateCallGameStorage  from '../../../../../blockchain/artifacts/contracts/Game.sol/DelegateCallGameStorage.json';

interface Player {
  name: string;
  wallet: string;
  bet: bigint;
  isPaid: boolean;
  isPaidOut: boolean;
  result: bigint;
}

interface GameData {
  bettingMaxTime: bigint;
  gameMaxTime: bigint;
  createdAt: bigint;
  startedAt: bigint;
  finishedAt: bigint;
  isBettingComplete: boolean;
  isGameAborted: boolean;
  isGameFinished: boolean;
}

interface BlockchainResponse {
  gameData: GameData;
  players: Player[];
}

@Component({
  selector: 'app-rock-paper-scissors',
  imports: [MatButton],
  standalone: true,
  templateUrl: './rock-paper-scissors.component.html',
  styleUrl: './rock-paper-scissors.component.scss',
})
export class RockPaperScissorsComponent implements OnInit {
  @Input() gameData!: IActiveGameList;
  @Output() emitter = new EventEmitter();

  private store = inject(Store);
  private provider = new ethers.JsonRpcProvider('http://localhost:8545');
  private contract: ethers.Contract | null = null;

  selectActiveGameData$ = this.store.select(selectActiveGameData);
  blockchainData: any;

  async ngOnInit() {
    this.selectActiveGameData$.subscribe(async (data) => {
      if (data.contractAddress) {
        this.contract = new ethers.Contract(data.contractAddress, DelegateCallGameStorage.abi, this.provider);
        await this.checkDataBlockchain();
      }
    });
  }

  async checkDataBlockchain() {
    if (!this.contract) return;

    try {
      const [
        [bettingMaxTime, gameMaxTime, createdAt, startedAt, finishedAt, isBettingComplete, isGameAborted, isGameFinished],
        [names, wallets, bets, isPaid, isPaidOut, results]
      ] = await Promise.all([
        this.contract['getGameData'](),
        this.contract['getAllPlayers']()
      ]);

      const players: Player[] = names.map((name: string, index: number) => ({
        name,
        wallet: wallets[index],
        bet: bets[index],
        isPaid: isPaid[index],
        isPaidOut: isPaidOut[index],
        result: results[index]
      }));

      const gameData: GameData = {
        bettingMaxTime,
        gameMaxTime,
        createdAt,
        startedAt,
        finishedAt,
        isBettingComplete,
        isGameAborted,
        isGameFinished
      };

      this.blockchainData = { gameData, players };
      console.log('Structured Blockchain data:', this.blockchainData);
      this.emitter.emit(this.blockchainData);

    } catch (error) {
      console.error('Error fetching blockchain data:', error);
    }
  }

  payBlockchain() {

  }
}
