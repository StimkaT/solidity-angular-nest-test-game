import {createReducer, on,} from '@ngrx/store';
import * as DiceGameActions from './dice-game.actions';
import {IActiveGameList} from '../game-data/game-data.reducer';

export const DICE_GAME_FEATURE_KEY = 'dice-game';

export interface IPlayerRoundData {
  wallet: string;
  name: string;
  result: string;
  typeResult: string;
  isPlaying: boolean;
  hasActed: boolean;
}

export interface IRoundResult {
  roundNumber: number;
  players: IPlayerRoundData[];
}

export interface IActiveGameDice extends IActiveGameList {
  type: 'dice';
  activeRound: number | null;
  roundsData: IRoundResult[];
}

export interface DiceGameState {
  gamesRounds: IActiveGameDice;
  // gameElements: IGameElements[];
}

// export interface IGameElements {
//   icon: string;
//   check: boolean | null;
//   name: string;
//   eventText: string;
// }
//
// export interface IEnhancedRoundResult extends IRoundResult {
//   playerDataMap: Map<string, IPlayerRoundData>;
// }
//
// export interface IRoundsViewData {
//   roundsData: IEnhancedRoundResult[];
//   playerList: string[];
//   hasData: boolean;
// }

export interface SettingsPartialState {
  readonly [DICE_GAME_FEATURE_KEY]: DiceGameState;
}

export const initialState: DiceGameState = {
  gamesRounds: {
    id: 0,
    type: 'dice',
    status: '',
    finishedAt: null,
    createdAt: '',
    updatedAt: '',
    bet: 0,
    playersNumber: 0,
    playerNumberSet: 0,
    players: [],
    activeRound: null,
    roundsData: [],
  },
  // gameElements: [
  //   {
  //     icon: 'sports_mma',
  //     check: null,
  //     name: 'Rock',
  //     eventText: '1',
  //   },
  //   {
  //     icon: 'content_cut',
  //     check: null,
  //     name: 'Scissors',
  //     eventText: '2',
  //   },
  //   {
  //     icon: 'insert_drive_file',
  //     check: null,
  //     name: 'Paper',
  //     eventText: '3',
  //   },
  // ],
};

export const diceGameReducer = createReducer(
  initialState,
  // on(RpsGameActions.setRpsRoundsData, (state, { data }) => ({
  //   ...state,
  //   gamesRounds: {
  //     ...data,
  //     roundsData: (data.roundsData ?? []).map((round: IRoundResult) => ({
  //       ...round,
  //       players: (round.players ?? []).map((player: IPlayerRoundData) => ({
  //         ...player,
  //         typeResult: 'icon',
  //         result:
  //           player.result === '1'
  //             ? 'sports_mma'
  //             : player.result === '2'
  //               ? 'content_cut'
  //               : player.result === '3'
  //                 ? 'insert_drive_file'
  //                 : player.result === '0'
  //                   ? 'close'
  //                   : '',
  //       })),
  //     })),
  //   },
  // })),
  // on(RpsGameActions.setActiveGameElements, (state, { data }) => ({
  //   ...state,
  //   gameElements: state.gameElements.map(element =>
  //     element.eventText === data
  //       ? { ...element, check: true }
  //       : { ...element, check: false }
  //   )
  // })),
  // on(RpsGameActions.resetActiveGameElements, (state) => ({
  //   ...state,
  //   gameElements: initialState.gameElements
  // })),
);
