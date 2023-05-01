import { Injectable } from '@nestjs/common/decorators';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PlayerService {
  playerPrisma = new PrismaClient().player;

  async getAllPlayers() {
    return await this.playerPrisma.findMany();
  }

  async createPlayer(data: any) {
    return await this.playerPrisma.create({
      data: {
        name: data.name,
        username: data.username,
      },
    });
  }

  async getSinglePlayer(id: number) {
    return await this.playerPrisma.findFirst({
      where: { id },
    });
  }

  async updatePlayer(id: any, data: any) {
    return await this.playerPrisma.update({
      where: { id: Number(id) },
      data: { rating_blitz: data.rating_blitz },
    });
  }
  async deletePlayer(id: any) {
    await this.playerPrisma.delete({
      where: { id: Number(id) },
    });
  }
}
