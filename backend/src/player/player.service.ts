import { Injectable } from '@nestjs/common/decorators';
import { PrismaClient } from '@prisma/client';
import { ResponseGetPlayerDto } from './dto/responseGetPlayer.dto';
import {
  BodyPostPlayerDto,
  BodyUpdatePlayerDto,
} from './dto/bodyPostPlayer.dto';

@Injectable()
export class PlayerService {
  playerPrisma = new PrismaClient().player;

  async getAllPlayers(): Promise<ResponseGetPlayerDto[]> {
    return await this.playerPrisma.findMany({
      include: {
        black_games: true,
        white_games: true,
      },
    });
  }

  async createPlayer(data: BodyPostPlayerDto): Promise<ResponseGetPlayerDto> {
    return await this.playerPrisma.create({
      data: {
        name: data.name,
        username: data.username,
      },
    });
  }

  async getSinglePlayer(id: string): Promise<ResponseGetPlayerDto | null> {
    return await this.playerPrisma.findFirst({
      where: { id: Number(id) },
    });
  }

  async updatePlayer(id: string, data: BodyUpdatePlayerDto) {
    return await this.playerPrisma.update({
      where: { id: Number(id) },
      data: { rating_blitz: data.rating_blitz },
    });
  }
  async deletePlayer(id: string): Promise<void> {
    await this.playerPrisma.delete({
      where: { id: Number(id) },
    });
  }

  async getBlitzRanking(): Promise<ResponseGetPlayerDto[]> {
    return await this.playerPrisma.findMany({
      orderBy: {
        rating_blitz: 'desc',
      },
    });
  }

  async getRapidRanking(): Promise<ResponseGetPlayerDto[]> {
    return await this.playerPrisma.findMany({
      orderBy: {
        rating_rapid: 'desc',
      },
    });
  }
}
