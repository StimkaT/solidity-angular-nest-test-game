import { Injectable } from '@nestjs/common';
// import { ethers } from 'ethers';
// import * as contractJson from '../../build/Game.sol/Game.json';
// // import * as contractArrayJson from '../../build/ArrayGame/ArrayGame.json';
// import * as contractArrayJson from '../../build/GameData.sol/ArrayGame.json';
// import { JsonRpcProvider, Wallet } from 'ethers';

@Injectable()
export class BlockchainService {
  createGame(game: any) {
    console.log('game data:', game);

    // try {
    //   const tx = await this.contract.addGame(game.id);
    //   await tx.wait(); // Ожидание подтверждения транзакции
    //   console.log(`Game with ID ${game.id} added successfully.`);
    // } catch (error) {
    //   console.error('Failed to add game:', error);
    //   throw new Error(`Failed to add game: ${error.message}`);
    // }
  }
}
