export interface IPlayerBlockchain {
    name: string;
    wallet: string;
    bet: string;
    isPaid: boolean;
    isPaidOut: boolean;
    result: number;
}

export interface IGameDataBlockchain {
    bettingMaxTime: bigint;
    gameMaxTime: bigint;
    createdAt: bigint;
    startedAt: bigint;
    finishedAt: bigint;
    isBettingComplete: boolean;
    isGameAborted: boolean;
    isGameFinished: boolean;
}