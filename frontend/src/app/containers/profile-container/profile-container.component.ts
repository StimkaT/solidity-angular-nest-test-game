import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {ProfileComponent} from '../../components/profile/profile.component';
import {Store} from '@ngrx/store';
import {getPlayer} from '../../+state/auth/auth.selectors';
import {AsyncPipe} from '@angular/common';
import {ethers} from 'ethers';
import {takeUntil} from 'rxjs';
import {environment} from '../../../environments/environment';

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
export class ProfileContainerComponent implements  OnInit {
  @Output() emitter = new EventEmitter();
  balance: any;
  private store = inject(Store);
  private destroy$ = new EventEmitter<void>();

  getUserData$ = this.store.select(getPlayer).pipe(takeUntil(this.destroy$));

  async ngOnInit() {
    this.getUserData$.subscribe(async (player) => {
      if (player?.wallet) {
        await this.getBalance(player.wallet);
      }
    });
  }

  async getBalance(walletAddress: string) {
    try {
      const provider = new ethers.JsonRpcProvider(environment.rpcUrl);
      const balance = await provider.getBalance(walletAddress);
      this.balance = ethers.formatEther(balance);
    } catch (error) {
      console.error('Error fetching balance:', error);
      this.balance = 'Error';
    }
  }

  ngOnDestroy() {
    this.destroy$.emit();
    this.destroy$.complete();
  }
}
