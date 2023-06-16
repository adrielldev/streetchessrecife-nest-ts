import { Module } from '@nestjs/common/decorators';
import { PlayerModule } from './player/player.module';
import { GamesModule } from './games/games.module';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [PlayerModule, GamesModule],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
