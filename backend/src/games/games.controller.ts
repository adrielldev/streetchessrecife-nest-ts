import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common/decorators';
import { GamesService } from './games.service';
import { HttpStatus } from '@nestjs/common';
import { ResponseGetGameDto } from './dto/responseGetGame.dto';
import { BodyPostGameDto, BodyUpdateGameDto } from './dto/bodyPostGame.dto';

@Controller('games')
export class GamesController {
  constructor(private gamesService: GamesService) {}

  @Get()
  async getAllGames(): Promise<ResponseGetGameDto[]> {
    return await this.gamesService.getAllGames();
  }

  @Post()
  async createGame(@Body() data: BodyPostGameDto): Promise<ResponseGetGameDto> {
    return await this.gamesService.createGame(data);
  }

  @Get(':id')
  async getSingleGame(
    @Param('id') id: string,
  ): Promise<ResponseGetGameDto | null> {
    return await this.gamesService.getSingleGame(id);
  }

  @Delete(':id')
  async deleteGame(@Param('id') id: string): Promise<HttpStatus> {
    await this.gamesService.deleteGame(id);
    return HttpStatus.NO_CONTENT;
  }

  @Put(':id')
  async updateGame(
    @Param('id') id: string,
    @Body() data: BodyUpdateGameDto,
  ): Promise<ResponseGetGameDto | null> {
    return await this.gamesService.updateGame(id, data);
  }

  @Get('/player/:player_id')
  async getAllGamesFromPlayer(
    @Param('player_id') player_id: string,
  ): Promise<ResponseGetGameDto[]> {
    return await this.gamesService.getAllGamesFromPlayer(Number(player_id));
  }
}
