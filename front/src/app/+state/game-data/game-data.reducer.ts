import { createReducer, on } from '@ngrx/store';
import * as GameDataActions from './game-data.actions';
import {walletListStabs} from './stabs';

export const GAME_DATA_FEATURE_KEY = 'game-data';

export interface IPlayer {
  name: string; // имя
  address: string; // номер кошелька
  privateKey: string; // приватный ключ для платежа
  balance?: number | null; // текущий баланс
  isPaid?: boolean; // Была ли оплата от этого кошелька в смарт контракте?
  amountPaid?: number | null; // Какая фактическая сумма пришла к оплате?
  percentage?: number | null; // процент выплат данному игроку от общего банка?
}
export interface IGameData {
  gameId: string; // id игры
  launchTime: string; // время создания игры
  startTime: string; // время старта игры
  finishTime: string; // время завершения игры
  conditionToStartDone: boolean; //условия для старта выполнены?
  isFinish: boolean; // игра окончена?
  gameTookPlace: boolean | null; //игра состоялась?
  bank: number;
  playerList: IPlayer[]; // список игроков и их условия
  bettingMaxTime?: number;
  gameMaxTime?: number;
}

export interface IGameList {
  iconList: string[];
  title: string;
  linkGame: string;
}
export interface IActiveGameList {
  id: string;
  needPlayers: number;
  registeredPlayers: number;
  bet: number;
}

export interface GameDataState {
  playerList: IPlayer[];
  selectedPlayerList: string[];
  gameData: IGameData;
  gameDataAddress: string;

  gameList: IGameList[];
  activeGameList: IActiveGameList[];
}

export interface SettingsPartialState {
  readonly [GAME_DATA_FEATURE_KEY]: GameDataState;
}

export const initialState: GameDataState = {
  selectedPlayerList: [],
  gameDataAddress: '',
  playerList: walletListStabs,
  gameData: {
    gameId: '',
    launchTime: '',
    startTime: '',
    finishTime: '',
    conditionToStartDone: false,
    isFinish: false,
    gameTookPlace: null,
    bank: 0,
    playerList: [],
  },

  gameList: [
    {
      iconList: [
        'pan_tool',
        'content_cut',
        'description'
      ],
      title: 'Rock-Paper-Scissors',
      linkGame: 'rock-paper-scissors'
    },
    {
      iconList: [
        'pan_tool',
        'content_cut',
        'description'
      ],
      title: 'Rock-Paper-Scissors',
      linkGame: ''
    }
  ],
  activeGameList: [
    {
      id: '111',
      needPlayers: 3213,
      registeredPlayers: 4332,
      bet: 1123
    },
    {
      id: '1111',
      needPlayers: 3213,
      registeredPlayers: 4332,
      bet: 1123
    },
    {
      id: '112',
      needPlayers: 3213,
      registeredPlayers: 4332,
      bet: 1123
    },
    {
      id: '1122',
      needPlayers: 3213,
      registeredPlayers: 4332,
      bet: 1123
    },
  ]
};

export const gameDataReducer = createReducer(
  initialState,
  on(GameDataActions.loadGameDataSuccess, (state, {data}) => ({
    ...state,
    gameDataAddress: data
  })),
  on(GameDataActions.setSelectedPlayerList, (state, {selectedPlayerList}) => ({
    ...state,
    selectedPlayerList
  })),
  on(GameDataActions.setLaunchTime, (state, { launchTime }) => ({
    ...state,
    gameData: {
      ...state.gameData,
      launchTime
    }
  })),
  on(GameDataActions.setSelectedPlayerListData, (state, { playerList }) => ({
    ...state,
    gameData: {
      ...state.gameData,
      playerList
    }
  })),
);
