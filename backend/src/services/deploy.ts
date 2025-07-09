import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import * as fs from 'fs';
import * as path from 'path';

interface Player {
  id: string;
  wallet: string;
  amount: string;
  ready: boolean;
}

interface GameData {
  id: string;
  players: Player[];
}

interface ContractArtifact {
  abi: any[];
  bytecode: string;
}

@Injectable()
export class GameDeployService {
  private provider: ethers.JsonRpcProvider;
  private wallet: ethers.Wallet;

  private readonly contractArtifactPath = path.resolve(
    __dirname,
    '../../../build/GameData.sol/ArrayGame.json',
  );

  constructor() {
    const rpcUrl = 'http://127.0.0.1:8545';
    const privateKey =
      '0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e';

    if (!rpcUrl || !privateKey) {
      throw new Error('RPC_URL or PRIVATE_KEY not set in .env');
    }

    this.provider = new ethers.JsonRpcProvider(rpcUrl);
    this.wallet = new ethers.Wallet(privateKey, this.provider);
  }

  async deployContract(data: GameData): Promise<string> {
    console.log('deployDATAGame', data);
    const artifactJson = fs.readFileSync(this.contractArtifactPath, 'utf8');
    const artifact = JSON.parse(artifactJson) as ContractArtifact;

    const factory = new ethers.ContractFactory(
      artifact.abi,
      artifact.bytecode,
      this.wallet,
    );

    const contract = await factory.deploy(data.id, data.players);
    await contract.waitForDeployment();
    const address = await contract.getAddress();

    console.log(`Contract deployed at: ${address}`);
    return address;
  }
}
