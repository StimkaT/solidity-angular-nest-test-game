import {IsNumber, IsOptional, IsString} from 'class-validator';

export class GamePlayerDto {
    @IsNumber()
    id: number;

    @IsNumber()
    gameId: number;

    @IsString()
    wallet: string;

    @IsNumber()
    userId: number;

    @IsOptional()
    user?: {
        id: number;
    };

    @IsOptional()
    game?: {
        id: number;
    };
}