export interface IRoundResult {
    roundNumber: number;
    players: {
        wallet: string;
        choice?: string;
    }[];
}
