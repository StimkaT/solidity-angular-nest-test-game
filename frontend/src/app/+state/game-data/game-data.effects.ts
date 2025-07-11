import { Injectable, inject } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {tap, withLatestFrom} from 'rxjs';
import {
  createGame, getActiveGames,
  getGameData, joinGame, leaveGame,
  loadGameData,
  loadGameDataFailure,
  loadGameDataSuccess, loadGameListSuccess,
  setSelectedPlayerList, setSelectedPlayerListData
} from './game-data.actions';
import {GameDataService} from '../../services/game-data.service';
import {Store} from '@ngrx/store';
import {selectPlayerList, selectSelectedPlayerList} from './game-data.selectors';
import {ethers} from 'ethers';
import {getPlayer} from '../auth/auth.selectors';
import {Router} from '@angular/router';

@Injectable()
export class GameDataEffects {
  private actions$ = inject(Actions);
  private gameDataService = inject(GameDataService);
  private store = inject(Store);
  private router = inject(Router);

  loadGameData$ = createEffect(() =>
      this.actions$.pipe(
        ofType(loadGameData),
        tap((action) => {
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

  createGame$ = createEffect(() =>
      this.actions$.pipe(
        ofType(createGame),
        withLatestFrom(
          this.store.select(getPlayer),
        ),
        tap(([{typeGame, playersNumber, bet}, player]) => {
          const payload = {
            type: typeGame,
            playersNumber,
            bet,
            wallet: player.wallet
          };
          this.gameDataService.createGame(payload).subscribe({
            next: (response) => {
              this.store.dispatch(getActiveGames({ game: typeGame }));
            },
            error: (error) => {
              console.error('Error creating game:', error);
              // this.store.dispatch(loadGameDataFailure({ error }));
            }
          });
        })
      ),
    { dispatch: false }
  );

  getGameList$ = createEffect(() =>
      this.actions$.pipe(
        ofType(getActiveGames),
        tap(({game}) => {
          this.gameDataService.getGameList(game).subscribe({
            next: (response) => {
              this.store.dispatch(loadGameListSuccess({ data: response.games }));
            },
            error: (error) => {
              console.error('Error creating game:', error);
              // this.store.dispatch(loadGameDataFailre({ error }));
            }
          });
        })
      ),
    { dispatch: false }
  );

  joinGame$ = createEffect(() =>
      this.actions$.pipe(
        ofType(joinGame),
        tap(({game, wallet, gameName}) => {
          const payload = {
            game,
            wallet
          }
          this.gameDataService.joinGame(payload).subscribe({
            next: (response) => {
              console.log('Join successfully:', response);
              if (response.success === true) {
                this.router.navigate([`/${gameName.toLowerCase()}/:${response.player.gameData.gameId}`]);
              } else if (response.success === false && response.message === "This user is already participating in the game") {
                this.router.navigate([`/${gameName.toLowerCase()}/:${game}`]);
              }
              // this.store.dispatch(loadGameListSuccess({ data: response.games }));
            },
            error: (error) => {
              console.error('Error creating game:', error);
              // this.store.dispatch(loadGameDataFailure({ error }));
            }
          });
        })
      ),
    { dispatch: false }
  );

  leaveGame$ = createEffect(() =>
      this.actions$.pipe(
        ofType(leaveGame),
        tap(({gameId, wallet}) => {
          const payload = {
            gameId,
            wallet
          }
          this.gameDataService.leaveGame(payload).subscribe({
            next: (response) => {
              console.log('Join successfully:', response);
              // this.router.navigate([`/`]);
              // this.store.dispatch(loadGameListSuccess({ data: response.games }));
            },
            error: (error) => {
              console.error('Error creating game:', error);
              // this.store.dispatch(loadGameDataFailure({ error }));
            }
          });
        })
      ),
    { dispatch: false }
  );
}
