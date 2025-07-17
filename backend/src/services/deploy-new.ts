import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import * as fs from 'fs';
import * as path from 'path';

interface Player {
  name: string;
  wallet: string;
  bet: string;
  isPaid: boolean;
  isPaidOut: boolean;
  result: number;
}

@Injectable()
export class GameDeployNewService {
  private provider: ethers.JsonRpcProvider;
  private wallet: ethers.Wallet;
  private logicAddress: string | null = null; // Добавляем переменную для хранения адреса

  private readonly logicArtifactPath = path.resolve(
    __dirname,
    '../../../blockchain/artifacts/contracts/GameLogic.sol/GameLogic.json',
  );
  private readonly storageArtifactPath = path.resolve(
    __dirname,
    '../../../blockchain/artifacts/contracts/Game.sol/DelegateCallGameStorage.json',
  );

  constructor() {
    const rpcUrl = 'http://127.0.0.1:8545';
    const privateKey =
      '0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e';

    this.provider = new ethers.JsonRpcProvider(rpcUrl);
    this.wallet = new ethers.Wallet(privateKey, this.provider);
  }

  async deployGameWithLogic(
    players: Player[],
    time1: number,
    time2: number,
  ): Promise<{ logicAddress: string; storageAddress: string }> {
    // 1. Деплой логики (только если адрес не сохранен)
    if (!this.logicAddress) {
      const logicArtifact = JSON.parse(
        fs.readFileSync(this.logicArtifactPath, 'utf8'),
      );
      const GameLogicFactory = new ethers.ContractFactory(
        logicArtifact.abi,
        logicArtifact.bytecode,
        this.wallet,
      );
      const logicContract = await GameLogicFactory.deploy();
      await logicContract.waitForDeployment();
      this.logicAddress = await logicContract.getAddress();
      console.log('GameLogic deployed at:', this.logicAddress);
    } else {
      console.log('Using existing GameLogic at:', this.logicAddress);
    }

    // 2. Деплой DelegateCallGameStorage
    const storageArtifact = JSON.parse(
      fs.readFileSync(this.storageArtifactPath, 'utf8'),
    );
    const DelegateCallGameStorageFactory = new ethers.ContractFactory(
      storageArtifact.abi,
      storageArtifact.bytecode,
      this.wallet,
    );
    const contract = await DelegateCallGameStorageFactory.deploy(
      players,
      this.logicAddress,
      time1,
      time2,
    );
    await contract.waitForDeployment();
    const storageAddress = await contract.getAddress();

    return {
      logicAddress: this.logicAddress,
      storageAddress,
    };
  }

  // Метод для сброса сохраненного адреса (если нужно)
  resetLogicAddress(): void {
    this.logicAddress = null;
  }

  // Метод для установки адреса вручную (если нужно)
  setLogicAddress(address: string): void {
    this.logicAddress = address;
  }
}
