import { Injectable, inject } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {tap, withLatestFrom} from 'rxjs';
import {
  closeWebSocketConnection,
  createGame, getActiveGames, getDataGame, getDataGameAndSetWebSocket, getGameTypes, getGameTypesSuccess,
  joinGame, leaveGame,
  loadDataGameSuccess,
  loadGameListSuccess,
  setSelectedPlayerList, setSelectedPlayerListData, setWebSocket
} from './game-data.actions';
import {GameDataService} from '../../services/game-data.service';
import {Store} from '@ngrx/store';
import {selectActiveGameData, selectGameTypes, selectPlayerList, selectSelectedPlayerList} from './game-data.selectors';
import {ethers} from 'ethers';
import {getPlayer} from '../auth/auth.selectors';
import {Router} from '@angular/router';
import {WebsocketService} from '../../services/websocket.service';

@Injectable()
export class GameDataEffects {
  private actions$ = inject(Actions);
  private gameDataService = inject(GameDataService);
  private store = inject(Store);
  private router = inject(Router);
  private wsService = inject(WebsocketService);


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
        withLatestFrom(
          this.store.select(getPlayer),
        ),
        tap(([{game}, player]) => {
          const payload = {
            type: game,
            player: player.wallet
          }
          this.gameDataService.getGameList(payload).subscribe({
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

  getDataGameAndSetWebSocket$ = createEffect(() =>
      this.actions$.pipe(
        ofType(getDataGameAndSetWebSocket),
        tap(({game}) => {
          this.store.dispatch(setWebSocket({gameId: game}));
          this.store.dispatch(getDataGame({game}));
        })
      ),
    { dispatch: false }
  );

  getDataGame$ = createEffect(() =>
      this.actions$.pipe(
        ofType(getDataGame),
        withLatestFrom(
          this.store.select(getPlayer),
        ),
        tap(([{game}, player]) => {
          const payload = {
            gameId: game,
            player: player.wallet
          }
          this.gameDataService.getDataGame(payload).subscribe({
            next: (response) => {
              this.store.dispatch(loadDataGameSuccess({ data: response.games }));
            },
            error: (error) => {
              console.error('Error creating game:', error);
              // this.store.dispatch(loadGameDataFailre({ error }));
            }
          });

          // this.store.dispatch(getGameDataApi())
        })
      ),
    { dispatch: false }
  );

  setWebSocket$ = createEffect(() =>
      this.actions$.pipe(
        ofType(setWebSocket),
        withLatestFrom(
          this.store.select(getPlayer),
        ),
        tap(([{gameId}, player]) => {
          this.wsService.initGameConnection(gameId, player.wallet);
        })
      ),
    { dispatch: false }
  );

  closeWebSocketConnection$ = createEffect(() =>
      this.actions$.pipe(
        ofType(closeWebSocketConnection),
        withLatestFrom(
          this.store.select(getPlayer),
        ),
        tap(([{gameId}, player]) => {
          this.wsService.disconnect();
        })
      ),
    { dispatch: false }
  );

  joinGame$ = createEffect(() =>
      this.actions$.pipe(
        ofType(joinGame),
        withLatestFrom(
          this.store.select(getPlayer),
          this.store.select(selectActiveGameData),
        ),
        tap(([{}, player, gameData]) => {
          const payload = {
            game: gameData.id,
            wallet: player.wallet
          }
          this.gameDataService.joinGame(payload).subscribe({
            next: (response) => {
              if (response.success === true) {
                this.router.navigate([`/game/${gameData.id}`]);
              } else if (response.success === false && response.message === "This user is already participating in the game") {
                this.router.navigate([`/game/${gameData.id}`]);
              }
              this.store.dispatch(getDataGame({game: gameData.id}));
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

  getGameTypes = createEffect(() =>
      this.actions$.pipe(
        ofType(getGameTypes),
        tap(({}) => {
          this.gameDataService.getGameTypes().subscribe({
            next: (response) => {
              this.store.dispatch(getGameTypesSuccess({data: response.gameTypes}))
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
        withLatestFrom(
          this.store.select(getPlayer),
          this.store.select(selectActiveGameData),
          this.store.select(selectGameTypes),
        ),
        tap(([{}, player, game, gameTypes]) => {
          const payload = {
            gameId: game.id,
            wallet: player.wallet
          }
          this.gameDataService.leaveGame(payload).subscribe({
            next: (response) => {
              this.store.dispatch(getDataGame({game: game.id}));
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
