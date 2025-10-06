import { createReducer, on } from '@ngrx/store';
import * as GameDataActions from './game-data.actions';
import {walletListStabs} from './stabs';
import {API} from '../../models/api';

export const GAME_DATA_FEATURE_KEY = 'game-data';

export interface ICreateGameAPI extends API {
  response: any;
}
export interface IPaymentGameAPI extends API {
  response: any;
}

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
  iconList?: string[];
  svgIconList?: string[];
  title: string;
  linkGame: string;
  readyStatus: boolean;
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
  finishedAt: any;
  createdAt: string | Date;
  updatedAt: string | Date;
  bet: number;
  playersNumber: number;
  playerNumberSet: number;
  bots: number;
}

export interface IPlayers {
  wallet: string;
  bet: boolean;
  name: string;
  ready: boolean;
  win: number | null;
}

export interface IGameTypes {
  id: number;
  name: string;
}

export interface IBalanceData {
  nameToken: string | null;
  balance: string;
  networkName: string;
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
  createGameAPI: ICreateGameAPI;
  paymentGameAPI: IPaymentGameAPI;
  balanceData: IBalanceData;
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
      linkGame: 'rock-paper-scissors',
      readyStatus: true,
    },
    {
      iconList: [
        'casino'
      ],
      title: 'Dice',
      linkGame: 'dice',
      readyStatus: true,
    },
    {
      svgIconList: [
        'roulette'
      ],
      title: 'Roulette',
      linkGame: 'roulette',
      readyStatus: false,
    },
    {
      svgIconList: [
        'slots'
      ],
      title: 'Slots',
      linkGame: 'slots',
      readyStatus: false,
    },
    {
      iconList: [
        'style'
      ],
      title: 'Blackjack',
      linkGame: 'blackjack',
      readyStatus: false,
    },
    {
      svgIconList: [
        'bingo'
      ],
      title: 'bingo',
      linkGame: 'bingo',
      readyStatus: false,
    },
    {
      svgIconList: [
        'poker'
      ],
      title: 'Poker',
      linkGame: 'poker',
      readyStatus: false,
    },
    {
      svgIconList: [
        'heads-and-tails'
      ],
      title: 'Heads-And-Tails',
      linkGame: 'heads-and-tails',
      readyStatus: false,
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
      bots: 0,
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
  createGameAPI: {
    startTime: null,
    loadingTime: null,
    isLoading: false,
    isLoaded: false,
    response: null,
  },
  paymentGameAPI: {
    startTime: null,
    loadingTime: null,
    isLoading: false,
    isLoaded: false,
    response: null,
  },
  balanceData: {
    nameToken: '',
    balance: '',
    networkName: '',
  }
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
  on(GameDataActions.setBalancePlayer, (state, { balance }) => ({
    ...state,
    balanceData: {
      ...state.balanceData,
      balance
    }
  })),
  on(GameDataActions.setNameToken, (state, { name }) => ({
    ...state,
    balanceData: {
      ...state.balanceData,
      nameToken: name
    }
  })),
  on(GameDataActions.setNetworkName, (state, { name }) => ({
    ...state,
    balanceData: {
      ...state.balanceData,
      networkName: name
    }
  })),
  on(GameDataActions.loadGameListSuccess, (state, { data }) => ({
    ...state,
    activeGameList: data.map((item: any) => ({
      id: item.id,
      type: item.type,
      contractAddress: item.contractAddress,
      ownerAddress: item.ownerAddress,
      finishedAt: item.finishedAt,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      bet: item.bet || 0,
      playersNumber: item.playersNumber || 0,
      playerNumberSet: item.playerNumberSet || 0,
      bots: item.bots || 0,
    }))
  })),
  on(GameDataActions.setGameData, (state, { data }) => {
    const gameInfo = data.gameData.gameInfo;
    const players = data.gameData.players;

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
      return {
        ...state,
        timer: state.timer.map(timer =>
          timer.gameId === gameId
            ? { ...timer, second, title }
            : timer
        )
      };
    } else {
      return {
        ...state,
        timer: [...state.timer, { gameId, second, title }]
      };
    }
  }),

  on(GameDataActions.createGame, (state) => ({
    ...state,
    createGameAPI: {
      ...state.createGameAPI,
      isLoading: true,
      isLoaded: false,
      startTime: Date.now(),
    }
  })),
  on(GameDataActions.createGameSuccess, (state) => ({
    ...state,
    createGameAPI: {
      ...state.createGameAPI,
      isLoading: false,
      isLoaded: true,
      loadingTime: Date.now() - state.createGameAPI.startTime!,
    }
  })),

  on(GameDataActions.sendMoney, (state) => ({
    ...state,
    paymentGameAPI: {
      ...state.paymentGameAPI,
      isLoading: true,
      isLoaded: false,
      startTime: Date.now(),
    }
  })),
  on(GameDataActions.sendMoneySuccess, (state, {response}) => ({
    ...state,
    paymentGameAPI: {
      ...state.paymentGameAPI,
      isLoading: false,
      isLoaded: true,
      loadingTime: Date.now() - state.paymentGameAPI.startTime!,
      response
    }
  })),
);
