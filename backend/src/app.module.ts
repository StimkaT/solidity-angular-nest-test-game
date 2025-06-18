import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { GameController } from './game/game.controller';
// import { BlockchainService } from './services/blockchain.service';
import { GameService } from './services/deploy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistrationModule } from './registration/registration.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'user',
      password: 'password',
      database: 'game',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    RegistrationModule,
  ],
  controllers: [AppController],
  providers: [AppService, GameService],
})
export class AppModule {}
