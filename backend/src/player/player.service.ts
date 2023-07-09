import { Injectable } from '@nestjs/common/decorators';
import { PrismaClient } from '@prisma/client';
import { ResponseGetPlayerDto } from './dto/responseGetPlayer.dto';
import {
  BodyPostPlayerDto,
  BodyUpdatePlayerDto,
} from './dto/bodyPostPlayer.dto';
import {
  BadRequestException,
  HttpException,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class PlayerService {
  playerPrisma = new PrismaClient().player;

  async getAllPlayers(): Promise<ResponseGetPlayerDto[]> {
    try {
      return await this.playerPrisma.findMany({
        include: {
          black_games: true,
          white_games: true,
        },
      });
    } catch (error) {
      throw new HttpException(
        error.message || 'Erro ao selecionar todos usuários',
        error.status || 400,
      );
    }
  }

  async createPlayer(data: BodyPostPlayerDto): Promise<ResponseGetPlayerDto> {
    try {
      const userExists = await this.playerPrisma.count({
        where: { username: data.username },
      });

      if (userExists)
        throw new BadRequestException('Usuário com username já existente');

      return await this.playerPrisma.create({
        data: {
          name: data.name,
          username: data.username,
        },
      });
    } catch (error) {
      throw new HttpException(
        error.message || 'Erro ao criar usuário',
        error.status || 400,
      );
    }
  }

  async getSinglePlayer(id: string): Promise<ResponseGetPlayerDto | null> {
    try {
      const userExists = await this.playerPrisma.count({
        where: { id: Number(id) },
      });
      if (!userExists) throw new NotFoundException('Usuário inexistente');
      return await this.playerPrisma.findFirst({
        where: { id: Number(id) },
      });
    } catch (error) {
      throw new HttpException(
        error.message || 'Erro ao selecionar usuário',
        error.status || 400,
      );
    }
  }

  async updatePlayer(id: string, data: BodyUpdatePlayerDto) {
    try {
      const userExists = await this.playerPrisma.count({
        where: { id: Number(id) },
      });

      if (!userExists) throw new NotFoundException('Usuário inexistente');
      return await this.playerPrisma.update({
        where: { id: Number(id) },
        data: { rating_rapid: data.rating_rapid, loses: Number(data?.loses) },
      });
    } catch (error) {
      throw new HttpException(
        error.message || 'Erro ao atualizar usuário',
        error.status || 400,
      );
    }
  }
  async deletePlayer(id: string): Promise<void> {
    try {
      const userExists = await this.playerPrisma.count({
        where: { id: Number(id) },
      });
      if (!userExists) throw new NotFoundException('Usuário inexistente');

      await this.playerPrisma.delete({
        where: { id: Number(id) },
      });
    } catch (error) {
      throw new HttpException(
        error.message || 'Erro ao deletar usuário',
        error.status || 400,
      );
    }
  }

  async getRapidRanking(): Promise<ResponseGetPlayerDto[]> {
    try {
      return await this.playerPrisma.findMany({
        orderBy: {
          rating_rapid: 'desc',
        },
      });
    } catch (error) {
      throw new HttpException(
        error.message || 'Erro ao pegar lista de usuários',
        error.status || 400,
      );
    }
  }
}
