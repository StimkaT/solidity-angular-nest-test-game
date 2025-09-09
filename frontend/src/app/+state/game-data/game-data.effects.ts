import { Injectable, inject } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {tap, withLatestFrom} from 'rxjs';
import {
  // closeWebSocketConnection,
  createGame, gameError, getActiveGames, getDataGameAndSetWebSocket, getGameTypes, getGameTypesSuccess,
  joinGame, leaveGame,
  loadGameListSuccess, makeAction, makeActionWithoutData, sendMoney, setGameData,
  setSelectedPlayerList, setSelectedPlayerListData, setWebSocketConnection
} from './game-data.actions';
import {GameDataService} from '../../services/game-data.service';
import {Store} from '@ngrx/store';
import {selectActiveGameData, selectPlayerList, selectSelectedPlayerList} from './game-data.selectors';
import {ethers} from 'ethers';
import {getPlayer} from '../auth/auth.selectors';
import {WebsocketService} from '../../services/websocket.service';
import {IGameData} from './game-data.reducer';
import {getActiveRound} from '../rps-game/rps-game.selectors';

@Injectable()
export class GameDataEffects {
  private actions$ = inject(Actions);
  private gameDataService = inject(GameDataService);
  private store = inject(Store);
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
            next: () => {
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
          this.store.dispatch(setWebSocketConnection({gameId: game}));
          // this.store.dispatch(getDataGame({game}));
        })
      ),
    { dispatch: false }
  );

  setWebSocketConnection$ = createEffect(() =>
      this.actions$.pipe(
        ofType(setWebSocketConnection),
        withLatestFrom(
          this.store.select(getPlayer),
        ),
        tap(([{gameId}, player]) => {
          this.wsService.initGameConnection(gameId, player.wallet);

          this.wsService.onPlayerJoin((data: IGameData) => {
            this.store.dispatch(setGameData({ data }));
          });

        })
      ),
    { dispatch: false }
  );

  // closeWebSocketConnection$ = createEffect(() =>
  //     this.actions$.pipe(
  //       ofType(closeWebSocketConnection),
  //       withLatestFrom(
  //         this.store.select(getPlayer),
  //       ),
  //       tap(([{gameId}, player]) => {
  //         // this.wsService.disconnect();
  //       })
  //     ),
  //   { dispatch: false }
  // );

  joinGame$ = createEffect(() =>
      this.actions$.pipe(
        ofType(joinGame),
        withLatestFrom(
          this.store.select(getPlayer),
          this.store.select(selectActiveGameData),
        ),
        tap(([, player, gameData]) => {
          const wallet = player.wallet;
          const gameId = gameData.id;

          this.wsService.joinGame(wallet, gameId);

          this.wsService.onJoinGameSuccess((data: any) => {
            this.store.dispatch(setGameData({ data }));
          });

          this.wsService.onError((error: any) => {
            this.store.dispatch(gameError({ error: error.message }));
          });
        })
      ),
    { dispatch: false }
  );

  sendMoney$ = createEffect(() =>
      this.actions$.pipe(
        ofType(sendMoney),
        withLatestFrom(
          this.store.select(getPlayer),
          this.store.select(selectActiveGameData),
        ),
        tap(([, player, gameData]) => {
          const wallet = player.wallet;
          const gameId = gameData.id;

          this.wsService.sendMoney(wallet, gameId);
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
        ),
        tap(([{}, player, game]) => {
          const gameId = game.id;
          const wallet =  player.wallet

          this.wsService.leaveGame(wallet, gameId);

          this.wsService.onLeaveGameSuccess((data: any) => {
            this.store.dispatch(setGameData({ data }));
          });

        })
      ),
    { dispatch: false }
  );

  makeAction$ = createEffect(() =>
      this.actions$.pipe(
        ofType(makeAction),
        withLatestFrom(
          this.store.select(getPlayer),
          this.store.select(getActiveRound),
        ),
        tap(([action, player, activeRound]) => {
          this.wsService.makeAction(action.result, player.wallet, activeRound!);
        })
      ),
    { dispatch: false }
  );

  makeActionWithoutData$ = createEffect(() =>
      this.actions$.pipe(
        ofType(makeActionWithoutData),
        withLatestFrom(
          this.store.select(getPlayer),
          this.store.select(getActiveRound),
        ),
        tap(([{}, player, activeRound]) => {
          this.wsService.makeActionWithoutData(player.wallet, activeRound!);
        })
      ),
    { dispatch: false }
  );
}
