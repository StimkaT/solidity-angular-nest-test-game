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
}

export interface IGameList {
  iconList: string[];
  title: string;
  linkGame: string;
}

export interface GameDataState {
  playerList: IPlayer[];
  selectedPlayerList: string[];
  gameData: IGameData;
  gameDataAddress: string;

  gameList: IGameList[];
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
  ]
};

// start и finish Смарт контракт создается с основного кошелька - player 10.

// при старте - создается id смартконтракта и он же сразу кладется при помощи функции в этот же
// смарт контракт + до этого создается отдельный wallet - куда мы будем переводить кэш.
// Как только приходят данные от смарт контракта с id - раздизейбливаются кнопки оплаты.
// Оплата: берем сторонний кошелек созданный смарт контрактом - и платим с указанного кошелька.
// После оплаты: смарт контракт - отслеживает платежи в блокчейне с указанных кошельков и проверяет
// была ли произведена оплата со всех кошельков
// Да была: раздизейбливаются поля для задания процентажа и finish кнопка.
// После нажатия finish: создается смартконтракт который сравнивает все кошельки из startContract
// и текущие пришедшие - если кошельки совпали - производит перевод токенов с ОБЩЕГО банка(кошелька)
// по расчетам процентажа и комиссий. И закрывает игру в startContract.
// После отдает ответ на back - success и завершает и свою работу.
// с бэка отправляются запросы о новых балансах использовавшихся кошельков и затратах на газ для всех
// операций - эта информация уходит на фронт и отображается на фронте

// для повтора игры - обновить страницу

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
