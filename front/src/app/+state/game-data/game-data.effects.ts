import { Injectable, inject } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {tap, withLatestFrom} from 'rxjs';
import {
  getGameData,
  loadGameData,
  loadGameDataFailure,
  loadGameDataSuccess,
  setSelectedPlayerList, setSelectedPlayerListData
} from './game-data.actions';
import {GameDataService} from '../../services/game-data.service';
import {Store} from '@ngrx/store';
import {selectPlayerList, selectSelectedPlayerList} from './game-data.selectors';
import {ethers} from 'ethers';

@Injectable()
export class GameDataEffects {
  private actions$ = inject(Actions);
  private gameDataService = inject(GameDataService);
  private store = inject(Store);

  loadGameData$ = createEffect(() =>
      this.actions$.pipe(
        ofType(loadGameData),
        tap((action) => {
          console.log('WAIT', action)
          this.gameDataService.setGameData(action.data).subscribe({
            next: (data) => {
              this.store.dispatch(loadGameDataSuccess({ data: data.contractAddress }));
              console.log(data)
            },
            error: (error) => this.store.dispatch(loadGameDataFailure({ error })),
          });
        })
      ),
    { dispatch: false }
  );

  getGameData$ = createEffect(() =>
      this.actions$.pipe(
        ofType(getGameData),
        tap((action) => {
          this.gameDataService.getGameData(action.data).subscribe({
            next: (data) =>console.log(data),
            error: (error) => this.store.dispatch(loadGameDataFailure({ error })),
          });
        })
      ),
    { dispatch: false }
  );

  setSelectedPlayerList$ = createEffect(() =>
      this.actions$.pipe(
        ofType(setSelectedPlayerList),
        withLatestFrom(
          this.store.select(selectSelectedPlayerList),
          this.store.select(selectPlayerList),
        ),
        tap(async ([{}, selectedPlayerList, playerList]) => {
          const selectedPlayersData = playerList
            .filter(player => selectedPlayerList.includes(player.address));

          const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545');

          const playersWithBalance = await Promise.all(
            selectedPlayersData.map(async player => {
              const balanceBigInt = await provider.getBalance(player.address);
              const balance = Number(ethers.formatEther(balanceBigInt));
              return { ...player, balance };
            })
          );

          this.store.dispatch(setSelectedPlayerListData({playerList: playersWithBalance}))
        })
      ),
    { dispatch: false }
  );
}
