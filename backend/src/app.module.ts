import { Module } from '@nestjs/common/decorators';
import { PlayerModule } from './player/player.module';
import { GamesModule } from './games/games.module';


@Module({
  imports: [PlayerModule, GamesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
