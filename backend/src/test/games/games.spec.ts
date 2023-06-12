import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateOtherPlayerMock, CreatePlayerMock } from '../mocks/PlayerMock';
import { GamesModule } from '../../games/games.module';
import { GamesService } from '../../games/games.service';
import {
  CreateGameMock,
  PlayerDoesntExistGameMock,
  SamePlayerGameMock,
  UpdateGameMock,
} from '../mocks/GamesMock';
import { PlayerModule } from '../../player/player.module';

describe('Testing /games', () => {
  let app: INestApplication;
  let gamesService: GamesService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [GamesModule, PlayerModule],
    })
      .overrideProvider(gamesService)
      .useValue(gamesService)
      .compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('Should get all games - GET /games', async () => {
    const response = await request(app.getHttpServer()).get('/games');

    expect(response.statusCode).toBe(200);
  });

  it('Should get a single game - GET /games/:id', async () => {
    const server = app.getHttpServer();
    await request(server).post('/player').send(CreatePlayerMock);

    await request(server).post('/player').send(CreateOtherPlayerMock);
    const newGame = await request(app.getHttpServer())
      .post('/games')
      .send(CreateGameMock);
    const createNewGame = await request(app.getHttpServer()).get(
      `/games/${newGame.body.id}`,
    );

    expect(createNewGame.statusCode).toBe(200);
    expect(createNewGame.body.result).toBe('w');
    expect(createNewGame.body.rating_white_player).toBeGreaterThan(1500);
    expect(createNewGame.body.rating_black_player).toBeLessThan(1500);

    await request(app.getHttpServer()).delete(
      `/games/${createNewGame.body.id}`,
    );
    await request(app.getHttpServer()).delete(
      `/player/${createNewGame.body.white_player.id}`,
    );
    await request(app.getHttpServer()).delete(
      `/player/${createNewGame.body.black_player.id}`,
    );
  });

  it('Shouldnt get a game with invalid id - GET /games/:id', async () => {
    const unexistentGame = await request(app.getHttpServer()).get(
      `/games/123141`,
    );
    expect(unexistentGame.statusCode).toBe(404);
    expect(unexistentGame.body.message).toBe('Jogo não encontrado');
  });

  it('Should create a game - POST /games', async () => {
    const server = app.getHttpServer();
    await request(server).post('/player').send(CreatePlayerMock);

    await request(server).post('/player').send(CreateOtherPlayerMock);
    const newGame = await request(app.getHttpServer())
      .post('/games')
      .send(CreateGameMock);
    expect(newGame.statusCode).toBe(201);
    expect(newGame.body.result).toBe('w');
    expect(newGame.body.rating_white_player).toBeGreaterThan(1500);
    expect(newGame.body.rating_black_player).toBeLessThan(1500);

    await request(app.getHttpServer()).delete(`/games/${newGame.body.id}`);
    await request(app.getHttpServer()).delete(
      `/player/${newGame.body.white_player.id}`,
    );
    await request(app.getHttpServer()).delete(
      `/player/${newGame.body.black_player.id}`,
    );
  });

  it('Shouldnt create a game without required fields - POST /games', async () => {
    const server = app.getHttpServer();

    const newGame = await request(app.getHttpServer())
      .post('/games')
      .send(CreateGameMock);
    expect(newGame.statusCode).toBe(404);
  });

  it('Shouldnt create a game with same player as black and white - POST /games', async () => {
    const player = await request(app.getHttpServer())
      .post('/player')
      .send(CreatePlayerMock);

    const newGame = await request(app.getHttpServer())
      .post('/games')
      .send(SamePlayerGameMock);

    expect(newGame.statusCode).toBe(400);
    expect(newGame.body.message).toBe('Não é possível jogar consigo mesmo');

    await request(app.getHttpServer()).delete(`/player/${player.body.id}`);
  });

  it('Shouldnt create a game where one of the players dont exist - POST /games', async () => {
    const newGame = await request(app.getHttpServer())
      .post('/games')
      .send(PlayerDoesntExistGameMock);

    expect(newGame.statusCode).toBe(404);
    expect(newGame.body.message).toBe('Um dos jogadores não encontrado');
  });

  it('Should update a game - PUT /games/:id', async () => {
    const server = app.getHttpServer();
    await request(server).post('/player').send(CreatePlayerMock);

    await request(server).post('/player').send(CreateOtherPlayerMock);
    const newGame = await request(app.getHttpServer())
      .post('/games')
      .send(CreateGameMock);

    const updateGame = await request(app.getHttpServer())
      .put(`/games/${newGame.body.id}`)
      .send(UpdateGameMock);

    expect(updateGame.statusCode).toBe(200);
    expect(updateGame.body.result).toBe(UpdateGameMock.result);

    await request(app.getHttpServer()).delete(`/games/${newGame.body.id}`);
    await request(app.getHttpServer()).delete(
      `/player/${newGame.body.white_player.id}`,
    );
    await request(app.getHttpServer()).delete(
      `/player/${newGame.body.black_player.id}`,
    );
  });

  it('Shouldnt update a game that doesnt exist - PUT /games/:id', async () => {});

  afterAll(async () => {
    await app.close();
  });
});
