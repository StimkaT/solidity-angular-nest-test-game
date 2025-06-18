import { IsString, MinLength } from 'class-validator';

export class RegistrationDto {
  @IsString()
  @MinLength(3)
  login: string;

  @IsString()
  @MinLength(6)
  password: string;
}
