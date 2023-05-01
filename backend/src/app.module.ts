import { Module } from '@nestjs/common/decorators';
import { PlayerModule } from './player/player.module';


@Module({
  imports: [PlayerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
