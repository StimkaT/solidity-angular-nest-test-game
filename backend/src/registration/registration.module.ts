import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { RegistrationController } from './registration.controller';
import { RegistrationService } from './registration.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
  JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
      secret: config.get<string>('JWT_SECRET'),
      signOptions: { expiresIn: config.get('JWT_EXPIRES_IN') },
    }),
  }),
  ConfigModule,],
  controllers: [RegistrationController],
  providers: [RegistrationService],
})
export class RegistrationModule {}
