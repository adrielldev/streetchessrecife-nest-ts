import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class GamesService {
  gamesPrisma = new PrismaClient().game;
  playerPrisma = new PrismaClient().player;

  async getAllGames() {
    return await this.gamesPrisma.findMany();
  }

  async createGame(data: any) {
    const jogador_brancas = await this.playerPrisma.findFirst({
      where: { username: data.jogador_brancas },
    });
    const jogador_negras = await this.playerPrisma.findFirst({
      where: { username: data.jogador_negras },
    });
    const ganhador = await this.playerPrisma.findFirst({
      where: { username: data.ganhador },
    });

    if (!jogador_brancas || !jogador_negras || !ganhador)
      throw new NotFoundException('Jogador não encontrado');

    // update rating do ganhador

    await this.playerPrisma.update({
      where: {
        id: ganhador.id,
      },
      data: {
        rating_blitz: ganhador.rating_blitz + 100,
      },
    });

    return await this.gamesPrisma.create({
      data: {
        ...data,
      },
    });
  }
}
