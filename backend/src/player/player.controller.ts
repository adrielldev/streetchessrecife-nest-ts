import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common/decorators';
import { PlayerService } from './player.service';
import { HttpStatus } from '@nestjs/common';
import { ResponseGetPlayerDto } from './dto/responseGetPlayer.dto';
import { BodyPostPlayerDto, BodyUpdatePlayerDto } from './dto/bodyPostPlayer.dto';

@Controller('player')
export class PlayerController {
  constructor(private playerService: PlayerService) {}

  @Get()
  async getAllPlayers(): Promise<ResponseGetPlayerDto[]> {
    return await this.playerService.getAllPlayers();
  }

  @Post()
  async createPlayer(
    @Body() data: BodyPostPlayerDto,
  ): Promise<ResponseGetPlayerDto> {
    return await this.playerService.createPlayer(data);
  }

  @Get(':id')
  async getSinglePlayer(
    @Param('id') param: { id: number },
  ): Promise<ResponseGetPlayerDto | null> {
    return await this.playerService.getSinglePlayer(param.id);
  }

  @Put(':id')
  async updatePlayer(@Param('id') id: string, @Body() data: BodyUpdatePlayerDto):Promise<ResponseGetPlayerDto> {
    return await this.playerService.updatePlayer(id, data);
  }

  @Delete(':id')
  async deletePlayer(@Param('id') id: string):Promise<HttpStatus> {
    await this.playerService.deletePlayer(id);
    return HttpStatus.NO_CONTENT;
  }
}
