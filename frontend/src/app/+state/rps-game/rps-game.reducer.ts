import {createReducer, on,} from '@ngrx/store';
import * as RpsGameActions from './rps-game.actions';

export const RPS_GAME_FEATURE_KEY = 'rps-game';

export interface IRoundResult {
  roundNumber: number;
  players: IPlayerRoundData[];
}

export interface IGameElements {
  icon: string;
  check: boolean | null;
  name: string;
  eventText: string;
}

export interface IRpsRoundsData {
  gameId: number;
  activeRound: number | null;
  gamePlayers: string[];
  roundsData: IRoundResult[];
}

export interface RpsGameState {
  gamesRounds: IRpsRoundsData;
  gameElements: IGameElements[];
}

export interface IPlayerRoundData {
  wallet: string;
  choice?: string;
  status?: string;
  typeChoice?: string;
}

export interface IEnhancedRoundResult extends IRoundResult {
  playerDataMap: Map<string, IPlayerRoundData>;
}

export interface IRoundsViewData {
  roundsData: IEnhancedRoundResult[];
  playerList: string[];
  hasData: boolean;
}

export interface SettingsPartialState {
  readonly [RPS_GAME_FEATURE_KEY]: RpsGameState;
}

export const initialState: RpsGameState = {
  gamesRounds: {
    gameId: 0,
    activeRound: null,
    gamePlayers: [],
    roundsData: [],
  },
  gameElements: [
    {
      icon: 'sports_mma',
      check: null,
      name: 'Rock',
      eventText: '1',
    },
    {
      icon: 'content_cut',
      check: null,
      name: 'Scissors',
      eventText: '2',
    },
    {
      icon: 'insert_drive_file',
      check: null,
      name: 'Paper',
      eventText: '3',
    },
  ],
};

export const rpsGameReducer = createReducer(
  initialState,
  on(RpsGameActions.setRpsRoundsData, (state, { data }) => ({
    ...state,
    gamesRounds: {
      ...data,
      roundsData: data.roundsData ? data.roundsData.map(round => ({
        ...round,
        players: round.players ? round.players.map(player => ({
          ...player,
          typeChoice: 'icon',
          choice: player.choice === '1' ? 'sports_mma' :
            player.choice === '2' ? 'content_cut' :
              player.choice === '3' ? 'insert_drive_file' :
                player.choice === '0' ? 'close' : ''
        })) : []
      })) : []
    }
  })),
  on(RpsGameActions.setActiveGameElements, (state, { data }) => ({
    ...state,
    gameElements: state.gameElements.map(element =>
      element.eventText === data
        ? { ...element, check: true }
        : { ...element, check: false }
    )
  })),
  on(RpsGameActions.resetActiveGameElements, (state) => ({
    ...state,
    gameElements: initialState.gameElements
  })),
);
