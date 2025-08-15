import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import * as fs from 'fs';
import * as path from 'path';
import { GameService } from './game.service';

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


  private readonly logicArtifactPath = path.resolve(
      __dirname,
      '../../../blockchain/artifacts/contracts/GameLogic.sol/GameLogic.json',
  );
  private readonly storageArtifactPath = path.resolve(
      __dirname,
      '../../../blockchain/artifacts/contracts/Game.sol/DelegateCallGameStorage.json',
  );

  constructor(
      private readonly gameService: GameService,
  ) {
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
      gameId: number,
  ) {
    let logicAddress = await this.gameService.getGameLogicAddress(gameId);

    // 1. Деплой логики (только если адрес не сохранен)
    if (!logicAddress) {
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
      logicAddress = await logicContract.getAddress();
      await this.gameService.setGameLogicAddress(gameId, logicAddress);

    } else {
      console.log('Using existing GameLogic at:', logicAddress);
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
        logicAddress,
        time1,
        time2,
    );
    await contract.waitForDeployment();
    const storageAddress = await contract.getAddress();

    await this.gameService.updateContractAddress(gameId, storageAddress);
    console.log('storageAddress', storageAddress);

    return {
      logicAddress,
      storageAddress,
    };
  }

  // Метод для сброса сохраненного адреса (если нужно)
  // resetLogicAddress(): void {
  //   this.logicAddress = null;
  // }

  // Метод для установки адреса вручную (если нужно)
  // setLogicAddress(address: string): void {
  //   this.logicAddress = address;
  // }
}
