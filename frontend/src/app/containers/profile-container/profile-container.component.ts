import {Component, EventEmitter, inject, Output} from '@angular/core';
import {ProfileComponent} from '../../components/profile/profile.component';
import {Store} from '@ngrx/store';
import {getPlayer} from '../../+state/auth/auth.selectors';
import {AsyncPipe} from '@angular/common';
import {ethers} from 'ethers';

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
export class ProfileContainerComponent {
  @Output() emitter = new EventEmitter();
  balance: any;
  private store = inject(Store);

  getUserData$ = this.store.select(getPlayer);

  async ngOnInit() {
    this.getUserData$.subscribe(async (player) => {
      if (player?.wallet) {
        await this.getBalance(player.wallet);
      }
    });
  }

  async getBalance(walletAddress: string) {
    try {
      const provider = new ethers.JsonRpcProvider('http://localhost:8545');
      const balance = await provider.getBalance(walletAddress);
      this.balance = ethers.formatEther(balance);
    } catch (error) {
      console.error('Error fetching balance:', error);
      this.balance = 'Error';
    }
  }
}
