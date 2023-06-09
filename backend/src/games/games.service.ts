import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ResponseGetGameDto } from './dto/responseGetGame.dto';
import { BodyPostGameDto, BodyUpdateGameDto } from './dto/bodyPostGame.dto';
import { EloRating } from '../utils/functions';

@Injectable()
export class GamesService {
  gamesPrisma = new PrismaClient().game;
  playerPrisma = new PrismaClient().player;

  async getAllGames(): Promise<ResponseGetGameDto[]> {
    try {
      return await this.gamesPrisma.findMany({
        include: {
          white_player: true,
          black_player: true,
        },
      });
    } catch (error) {
      throw new HttpException(
        error.message || 'Erro ao selecionar todos jogos',
        error.status || 400,
      );
    }
  }

  async createGame(data: BodyPostGameDto): Promise<ResponseGetGameDto> {
    try {
      const white_player = await this.playerPrisma.findFirst({
        where: { username: data.white_player },
      });
      const black_player = await this.playerPrisma.findFirst({
        where: {
          username: data.black_player,
        },
      });
      if (!white_player || !black_player)
        throw new NotFoundException('Um dos jogadores não encontrado');

      if (data.white_player == data.black_player)
        throw new BadRequestException('Não é possível jogar consigo mesmo');

      const objRating = EloRating(
        white_player.rating_rapid,
        black_player.rating_rapid,
        data.result,
      );

      await this.playerPrisma.update({
        where: { id: white_player.id },
        data: {
          rating_rapid: Math.round(objRating.rating_a),
          victories:
            data.result == 'w'
              ? white_player.victories + 1
              : white_player.victories,
          draws:
            data.result == 'd' ? white_player.draws + 1 : white_player.draws,
          loses:
            data.result == 'b' ? white_player.loses + 1 : white_player.loses,
        },
      });

      await this.playerPrisma.update({
        where: { id: black_player.id },
        data: {
          rating_rapid: Math.round(objRating.rating_b),
          victories:
            data.result == 'b'
              ? black_player.victories + 1
              : black_player.victories,
          draws:
            data.result == 'd' ? black_player.draws + 1 : black_player.draws,
          loses:
            data.result == 'w' ? black_player.loses + 1 : black_player.loses,
        },
      });

      return await this.gamesPrisma.create({
        data: {
          result: data.result,
          white_player_id: white_player.id,
          black_player_id: black_player.id,
          rating_white_player: Math.round(objRating.rating_a),
          rating_black_player: Math.round(objRating.rating_b),
        },
        include: {
          white_player: true,
          black_player: true,
        },
      });
    } catch (error) {
      throw new HttpException(
        error.message || 'Erro ao criar jogo',
        error.status || 400,
      );
    }
  }

  async getSingleGame(id: string): Promise<ResponseGetGameDto | null> {
    try {
      const gameExist = await this.gamesPrisma.count({
        where: { id: Number(id) },
      });
      if (!gameExist) throw new NotFoundException('Jogo não encontrado');
      return await this.gamesPrisma.findUnique({
        where: { id: Number(id) },
        include: {
          black_player: true,
          white_player: true,
        },
      });
    } catch (error) {
      throw new HttpException(
        error.message || 'Erro ao buscar jogo específico',
        error.status || 400,
      );
    }
  }

  async deleteGame(id: string): Promise<void> {
    try {
      const gameExist = await this.gamesPrisma.count({
        where: { id: Number(id) },
      });
      if (!gameExist) throw new NotFoundException('Jogo não encontrado');
      await this.gamesPrisma.delete({
        where: { id: Number(id) },
      });
    } catch (error) {
      throw new HttpException(
        error.message || 'Erro ao deletar jogo',
        error.status || 400,
      );
    }
  }

  async updateGame(
    id: string,
    data: BodyUpdateGameDto,
  ): Promise<ResponseGetGameDto | null> {
    const gameExist = await this.gamesPrisma.count({
      where: { id: Number(id) },
    });
    if (!gameExist) throw new NotFoundException('Jogo não encontrado');

    try {
      return await this.gamesPrisma.update({
        where: { id: Number(id) },
        data: { result: data.result },
        include: { black_player: true, white_player: true },
      });
    } catch (error) {
      throw new HttpException(
        error.message || 'Erro ao atualizar jogo',
        error.status || 400,
      );
    }
  }

  async getAllGamesFromPlayer(
    player_id: number,
  ): Promise<ResponseGetGameDto[]> {
    try {
      const userExist = await this.playerPrisma.count({
        where: { id: player_id },
      });
      if (!userExist) throw new NotFoundException('Usuário não encontrado');

      return await this.gamesPrisma.findMany({
        where: {
          OR: [
            {
              black_player_id: player_id,
            },
            {
              white_player_id: player_id,
            },
          ],
        },
        include: {
          white_player: true,
          black_player: true,
        },
      });
    } catch (error) {
      throw new HttpException(
        error.message || 'Erro ao buscar jogos do jogador',
        error.status || 400,
      );
    }
  }

  async getAllBlackGamesFromPlayer(
    player_id: number,
  ): Promise<ResponseGetGameDto[]> {
    try {
      const userExist = await this.playerPrisma.count({
        where: { id: player_id },
      });
      if (!userExist) throw new NotFoundException('Usuário não encontrado');

      return await this.gamesPrisma.findMany({
        where: {
          black_player_id: player_id,
        },
        include: {
          white_player: true,
          black_player: true,
        },
      });
    } catch (error) {
      throw new HttpException(
        error.message || 'Erro ao buscar jogos de negras do jogador',
        error.status || 400,
      );
    }
  }

  async getAllWhiteGamesFromPlayer(
    player_id: number,
  ): Promise<ResponseGetGameDto[]> {
    try {
      const userExist = await this.playerPrisma.count({
        where: { id: player_id },
      });
      if (!userExist) throw new NotFoundException('Usuário não encontrado');

      return await this.gamesPrisma.findMany({
        where: {
          white_player_id: player_id,
        },
        include: {
          white_player: true,
          black_player: true,
        },
      });
    } catch (error) {
      throw new HttpException(
        error.message || 'Erro ao buscar jogos de brancas do jogador',
        error.status || 400,
      );
    }
  }

  async getVictories(player_id: number): Promise<ResponseGetGameDto[]> {
    try {
      const userExist = await this.playerPrisma.count({
        where: { id: player_id },
      });
      if (!userExist) throw new NotFoundException('Usuário não encontrado');

      return await this.gamesPrisma.findMany({
        where: {
          OR: [
            { AND: [{ white_player_id: player_id }, { result: 'w' }] },
            { AND: [{ black_player_id: player_id }, { result: 'b' }] },
          ],
        },
        include: { white_player: true, black_player: true },
      });
    } catch (error) {
      throw new HttpException(
        error.message || 'Erro ao buscar vitórias do jogador',
        error.status || 400,
      );
    }
  }

  async getDraws(player_id: number): Promise<ResponseGetGameDto[]> {
    try {
      const userExist = await this.playerPrisma.count({
        where: { id: player_id },
      });
      if (!userExist) throw new NotFoundException('Usuário não encontrado');

      return await this.gamesPrisma.findMany({
        where: {
          OR: [
            { AND: [{ white_player_id: player_id }, { result: 'd' }] },
            { AND: [{ black_player_id: player_id }, { result: 'd' }] },
          ],
        },
        include: { black_player: true, white_player: true },
      });
    } catch (error) {
      throw new HttpException(
        error.message || 'Erro ao buscar empates do jogador',
        error.status || 400,
      );
    }
  }

  async getLoses(player_id: number): Promise<ResponseGetGameDto[]> {
    try {
      const userExist = await this.playerPrisma.count({
        where: { id: player_id },
      });
      if (!userExist) throw new NotFoundException('Usuário não encontrado');

      return await this.gamesPrisma.findMany({
        where: {
          OR: [
            { AND: [{ white_player_id: player_id }, { result: 'b' }] },
            { AND: [{ black_player_id: player_id }, { result: 'w' }] },
          ],
        },
        include: { black_player: true, white_player: true },
      });
    } catch (error) {
      throw new HttpException(
        error.message || 'Erro ao buscar derrotas do jogador',
        error.status || 400,
      );
    }
  }

  async getGamesAgainstOther(
    player_id: number,
    other_player_id: number,
  ): Promise<ResponseGetGameDto[]> {
    try {
      const playerExist = await this.playerPrisma.count({
        where: { id: player_id },
      });
      const otherPlayerExist = await this.playerPrisma.count({
        where: { id: other_player_id },
      });
      if (!playerExist || !otherPlayerExist)
        throw new NotFoundException('Um dos jogadores não existe');

      if (player_id == other_player_id)
        throw new BadRequestException(
          'Não existem jogos do jogador contra si mesmo',
        );

      return await this.gamesPrisma.findMany({
        where: {
          OR: [
            {
              AND: [
                { white_player_id: player_id },
                { black_player_id: other_player_id },
              ],
            },
            {
              AND: [
                { black_player_id: player_id },
                { white_player_id: other_player_id },
              ],
            },
          ],
        },
        include: { black_player: true, white_player: true },
      });
    } catch (error) {
      throw new HttpException(
        error.message ||
          'Erro ao buscar jogos do jogador contra outro jogador específico',
        error.status || 400,
      );
    }
  }
}
