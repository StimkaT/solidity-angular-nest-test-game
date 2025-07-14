import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistrationController } from './registration.controller';
import { RegistrationService } from '../services/registration.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from '../services/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { Users } from '../entities/entities/Users';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: config.get('JWT_EXPIRES_IN') },
      }),
    }),
    ConfigModule,
    PassportModule,
  ],
  controllers: [RegistrationController],
  providers: [RegistrationService, JwtStrategy],
  exports: [JwtModule, PassportModule],
})
export class RegistrationModule {}
