import {IsDate, IsOptional, IsString, MinLength} from 'class-validator';

export class GameDto {
  @IsString()
  @MinLength(1)
  type: string;

  @IsString()
  @IsOptional()
  contractAddress?: string;

  @IsString()
  ownerAddress: string;

  @IsString()
  wallet: string;

  @IsDate()
  @IsOptional()
  finishedAt?: string;
}
