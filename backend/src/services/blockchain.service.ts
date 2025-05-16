import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import * as contractJson from '../../build/Game/Game.json';
import { JsonRpcProvider, Wallet } from 'ethers';

@Injectable()
export class BlockchainService {
  private provider: JsonRpcProvider;
  private wallet: Wallet;
  private contract: ethers.Contract;

  constructor() {
    // Инициализация провайдера с использованием RPC URL
    this.provider = new JsonRpcProvider('http://127.0.0.1:8545');

    // Создание кошелька с использованием приватного ключа и провайдера
    this.wallet = new Wallet(
      '0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e',
      this.provider,
    );

    // Адрес задеплоенного контракта
    const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

    // Создание экземпляра контракта
    this.contract = new ethers.Contract(
      contractAddress,
      contractJson.abi,
      this.wallet,
    );
  }

  // Метод для добавления новой игры в массив Game
  async addGame(game: { id: string }) {
    try {
      const tx = await this.contract.addGame(game.id);
      await tx.wait(); // Ожидание подтверждения транзакции
      console.log(`Game with ID ${game.id} added successfully.`);
    } catch (error) {
      console.error('Failed to add game:', error);
      throw new Error(`Failed to add game: ${error.message}`);
    }
  }

  async getGame() {
    try {
      const game = await this.contract.getGameData();
      console.log('GET', game);
      return game;
    } catch (error) {
      console.error('Failed to get game:', error);
      throw new Error(`Failed to get game: ${error.message}`);
    }
  }
}
