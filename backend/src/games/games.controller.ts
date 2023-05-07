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

@Controller('games')
export class GamesController {
  constructor(private gamesService: GamesService) {}

  @Get()
  async getAllGames() {
    return await this.gamesService.getAllGames();
  }

  @Post()
  async createGame(@Body() data: any): Promise<any> {
    return await this.gamesService.createGame(data);
  }

  @Get(':id')
  async getSingleGame(@Param('id') id: string): Promise<any> {
    return await this.gamesService.getSingleGame(id);
  }

  @Delete(':id')
  async deleteGame(@Param('id') id: string): Promise<HttpStatus> {
    await this.gamesService.deleteGame(id);
    return HttpStatus.NO_CONTENT;
  }

  @Put(':id')
  async updateGame(@Param('id') id: string, @Body() data: any): Promise<any> {
    return await this.gamesService.updateGame(id, data);
  }
}
