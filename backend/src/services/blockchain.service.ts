import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import * as contractJson from '../../build/Game/Game.json';
// import * as contractArrayJson from '../../build/ArrayGame/ArrayGame.json';
import * as contractArrayJson from '../../build/GameData.sol/ArrayGame.json';
import { JsonRpcProvider, Wallet } from 'ethers';

@Injectable()
export class BlockchainService {
  private provider: JsonRpcProvider;
  private wallet: Wallet;
  private contract: ethers.Contract;
  private contractArray: ethers.Contract;
  private contractData: ethers.Contract;

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
    const contractAddressArray = '0xC8c6E4176C9a23e886A9BcCcb80ABCbc3C5c2D65';

    // Создание экземпляра контракта
    this.contract = new ethers.Contract(
      contractAddress,
      contractJson.abi,
      this.wallet,
    );

    // Создание экземпляра контракта
    this.contractArray = new ethers.Contract(
      contractAddressArray,
      contractArrayJson.abi,
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

  // Метод для добавления новой игры в массив Game
  async addGameArray(gameData: { id: string; bet: any }) {
    try {
      const tx = await this.contractArray.addGame(gameData.id, gameData.bet);
      await tx.wait(); // Ожидание подтверждения транзакции
      console.log(`Game with ID ${gameData} added successfully.`);
    } catch (error) {
      console.error('Failed to add game:', error);
      throw new Error(`Failed to add game: ${error.message}`);
    }
  }

  async getGameArray(data: string) {
    console.log('212jdsfjfij2rpre',data)
    try {
      // Создание экземпляра контракта
      this.contractArray = new ethers.Contract(
        data,
        contractArrayJson.abi,
        this.wallet,
      );

      const gameData = await this.contractArray.getGameData();

      return gameData;
    } catch (error) {
      console.error('Failed to get game:', error);
      throw new Error(`Failed to get game: ${error.message}`);
    }
  }

  // private replacer(key: string, value: any) {
  //   return typeof value === 'bigint' ? value.toString() : value;
  // }
  //
  // async getGameArray() {
  //   try {
  //     const games = await this.contract.getGameData();
  //     return JSON.parse(JSON.stringify(games, this.replacer));
  //   } catch (error) {
  //     throw new Error(`Failed to get games: ${error.message}`);
  //   }
  // }
}
