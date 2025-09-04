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

export interface ITimer {
  gameId: number;
  second: number | null;
  title: string;
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
  gameType?: string;
}

export interface IGameList {
  iconList: string[];
  title: string;
  linkGame: string;
}
export interface IActiveGameList {
  id: number;
  type: string | null;
  status: string;
  finishedAt: Date | null;
  createdAt: string | Date;
  updatedAt: string | Date;
  bet: number;
  playersNumber: number;
  playerNumberSet: number;
  players: IPlayers[];
}

export interface IDataGameList {
  id: number;
  type: string | null;
  contractAddress: string;
  ownerAddress: string;
  finishedAt: Date | null;
  createdAt: string | Date;
  updatedAt: string | Date;
  bet: number;
  playersNumber: number;
  playerNumberSet: number;
}

export interface IPlayers {
  wallet: string;
  bet: boolean;
  ready: boolean;
  win: number | null;
}

export interface IGameTypes {
  id: number;
  name: string;
}

export interface GameDataState {
  playerList: IPlayer[];
  selectedPlayerList: string[];
  gameData: IGameData;
  gameDataAddress: string;
  gameTypes: IGameTypes[];
  gameList: IGameList[];
  activeGameList: IDataGameList[];
  activeGameData: IActiveGameList;
  timer: ITimer[];
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
  gameTypes: [
  ],
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
        'casino'
      ],
      title: 'Dice',
      linkGame: 'dice'
    }
  ],
  activeGameList: [
    {
      id: 1,
      type: 'Rock-Paper-Scissors',
      contractAddress: '',
      ownerAddress: '',
      finishedAt: null,
      createdAt: '',
      updatedAt: '',
      bet: 0,
      playersNumber: 0,
      playerNumberSet: 0,
    }
  ],
  activeGameData: {
    id: 0,
    type: null,
    status: '',
    finishedAt: null,
    createdAt: '',
    updatedAt: '',
    bet: 0,
    playersNumber: 0,
    playerNumberSet: 0,
    players: []
  },
  timer: [],
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
  on(GameDataActions.loadGameListSuccess, (state, { data }) => ({
    ...state,
    activeGameList: data.map((item: any) => ({
      id: item.game_id,
      type: item.game_type,
      contractAddress: item.game_contractAddress,
      ownerAddress: item.game_ownerAddress,
      finishedAt: item.game_finished_at,
      createdAt: item.game_created_at,
      updatedAt: item.game_updated_at,
      bet: item.gameData_bet || 0,
      playersNumber: item.gameData_players_number || 0,
      playerNumberSet: item.gameData_player_number_set || 0,

    }))
  })),
  on(GameDataActions.setGameData, (state, { data }) => {
    const gameInfo = data.gameInfo;
    const players = data.players;

    return {
      ...state,
      activeGameData: {
        id: gameInfo.id,
        type: gameInfo.type,
        status: gameInfo.status,
        finishedAt: gameInfo.finishedAt || '-',
        createdAt: gameInfo.createdAt || '-',
        updatedAt: gameInfo.updatedAt || '-',
        bet: gameInfo.bet || '-',
        playersNumber: gameInfo.playersNumber || 0,
        playerNumberSet: gameInfo.activePlayersCount || 0,
        players: players
      }
    }
  }),
  on(GameDataActions.getGameTypesSuccess, (state, { data }) => ({
    ...state,
    gameTypes: data
  })),
  on(GameDataActions.setTimer, (state, { gameId, second, title }) => {
    const existingTimerIndex = state.timer.findIndex(t => t.gameId === gameId);

    if (existingTimerIndex !== -1) {
      // Обновляем существующий таймер
      return {
        ...state,
        timer: state.timer.map(timer =>
          timer.gameId === gameId
            ? { ...timer, second, title }
            : timer
        )
      };
    } else {
      // Добавляем новый таймер
      return {
        ...state,
        timer: [...state.timer, { gameId, second, title }]
      };
    }
  }),
);
