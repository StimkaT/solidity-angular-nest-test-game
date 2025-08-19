import { Type } from 'class-transformer';
import {IsArray, IsDate, IsNumber, IsOptional, IsString} from 'class-validator';
import {GamePlayerDto} from "./GamePlayer.dto";

export class GameDataDto {
    @IsNumber()
    id: number;

    @IsString()
    @IsOptional()
    type: string | null;

    @IsDate()
    @Type(() => Date)
    @IsOptional()
    finishedAt: Date | null;

    @IsDate()
    @Type(() => Date)
    createdAt: Date | null;

    @IsDate()
    @Type(() => Date)
    updatedAt: Date | null;

    @IsNumber()
    bet: number;

    @IsNumber()
    playersNumber: number;

    @IsNumber()
    activePlayersCount: number;

    @IsString()
    @IsOptional()
    contractAddress: string | null;

    @IsArray()
    players: GamePlayerDto[];
}