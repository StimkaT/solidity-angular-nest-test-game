import { createReducer, on } from '@ngrx/store';
import * as GameDataActions from './game-data.actions';


export const GAME_DATA_FEATURE_KEY = 'game-data';

interface IPlayer {
  name: string;
  address: string;
  privateKey: string;
  balance: number;
  isReady: boolean;
  bet?: number;
  percentage?: number;
}

export interface GameDataState {
  playerList: IPlayer[];
  selectedPlayerList: string[];
}

export interface SettingsPartialState {
  readonly [GAME_DATA_FEATURE_KEY]: GameDataState;
}

export const initialState: GameDataState = {
  playerList: [
    {
      name: 'Player 1',
      address: '0x4cCE85dA450fC8D96B87671683B07297F13C13ff',
      privateKey: '37cadf72c4f33fb624f5872c9262a70fc0f6a1b1d31f3cedb7cc20201508251d',
      balance: 0,
      isReady: false,
      bet: 0
    },
    {
      name: 'Player 2',
      address: '0xc8dBEDEd3f0f3fDA4DDa3fAF353C305Ad44cCbCA',
      privateKey: 'fde292ba78cb9dde009d7eab8a262b7e0d61b39f839c6e597444fa332be79251',
      balance: 0,
      isReady: false,
      bet: 0
    },
  ],
  selectedPlayerList: ['0x4cCE85dA450fC8D96B87671683B07297F13C13ff']
};

export const gameDataReducer = createReducer(
  initialState,
);
