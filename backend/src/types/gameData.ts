export interface IGameData {
    gameInfo: IGameInfo;
    players: IPlayer[];
}

export interface IPlayer {
    wallet: string;
    bet: boolean;
    ready: boolean;
}

export interface IGameInfo {
    id: number;
    type: string | null;
    status: string;
    bet: number;
    activePlayersCount: number;
    playersNumber: number;
    createdAt: Date | null;
    finishedAt: Date | null;
    updatedAt: Date | null;
    contractAddress?: string | null;
}


export interface ICreateGameData {
    wallet: string;
    userId: number;
    type: string;
    playersNumber: number;
    bots: number;
    bet: number;
}
