import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IActiveGameList } from '../../+state/game-data/game-data.reducer';
import { MatButton } from '@angular/material/button';

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
export class RockPaperScissorsComponent {
  @Input() gameData!: IActiveGameList;
  @Output() emitter = new EventEmitter();

  async checkDataBlockchain() {
  }

  payBlockchain() {

  }
}
