import {Component, EventEmitter, inject, OnDestroy, OnInit, Output} from '@angular/core';
import {ProfileComponent} from '../../components/profile/profile.component';
import {Store} from '@ngrx/store';
import {getPlayer} from '../../+state/auth/auth.selectors';
import {AsyncPipe} from '@angular/common';
import {ethers} from 'ethers';
import tokenArtifact from "../../../contracts/ERC20.sol/ERC20.json";
import {takeUntil} from 'rxjs';
import {environment} from '../../../environments/environment';
import {setBalancePlayer, setNameToken, setNetworkName} from '../../+state/game-data/game-data.actions';
import {getBalanceData} from '../../+state/game-data/game-data.selectors';

@Component({
  selector: 'app-profile-container',
  imports: [
    ProfileComponent,
    AsyncPipe
  ],
  standalone: true,
  templateUrl: './profile-container.component.html',
  styleUrl: './profile-container.component.scss'
})
export class ProfileContainerComponent implements  OnInit, OnDestroy {
  @Output() emitter = new EventEmitter();
  private store = inject(Store);
  private destroy$ = new EventEmitter<void>();

  balance: any;

  getUserData$ = this.store.select(getPlayer).pipe(takeUntil(this.destroy$));
  getBalanceData$ = this.store.select(getBalanceData);

  async ngOnInit() {
    this.getUserData$.subscribe(async (player) => {
      if (player?.wallet) {
        await this.getBalance(player.wallet);
      }
    });

    const provider = new ethers.JsonRpcProvider(environment.rpcUrl);
    const networkName = (await provider.getNetwork()).name;
    this.store.dispatch(setNetworkName({name: networkName}))
    const abi = ["function symbol() view returns (string)"];
    const tokenContract = new ethers.Contract(environment.tokenAddress, abi, provider);

    const symbol = await tokenContract["symbol"]();
    this.store.dispatch(setNameToken({name: symbol}))
  }

  async getBalance(walletAddress: string) {
    try {
      const provider = new ethers.JsonRpcProvider(environment.rpcUrl);
      const tokenAddress = environment.tokenAddress;
      const tokenContract = new ethers.Contract(tokenAddress, tokenArtifact.abi, provider);
      const balance = await tokenContract["balanceOf"](walletAddress);
      const decimals = await tokenContract["decimals"]();
      const setBalance = ethers.formatUnits(balance, decimals);
      this.store.dispatch(setBalancePlayer({balance: setBalance}))

      // console.log(`Баланс ${walletAddress}: ${this.balance} PGT`);
    } catch (error) {
      console.error("Error fetching token balance:", error);
      this.balance = "Error";
    }

  }

  events(event: any) {
    if (event.event === 'ProfileComponent:GetBalance') {
      void this.getBalance(event.data.wallet);
    }
  }

  ngOnDestroy() {
    this.destroy$.emit();
    this.destroy$.complete();
  }
}
