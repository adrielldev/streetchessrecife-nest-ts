import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { PlayerModule } from '../../player/player.module';
import { PlayerService } from '../../player/player.service';
import { INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import {
  CreateOtherPlayerMock,
  CreatePlayerMock,
  CreatePlayerUnexistingFieldsMock,
  SameUsernamePlayerMock,
  updatePlayerMock,
} from '../mocks/PlayerMock';
import { CreateGameMock } from '../mocks/GamesMock';

describe('Testing /player', () => {
  let app: INestApplication;
  let playerService: PlayerService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [PlayerModule],
    })
      .overrideProvider(PlayerService)
      .useValue(playerService)
      .compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('Should get all players - GET /player', async () => {
    const response = await request(app.getHttpServer()).get('/player');

    // há um problema com a data dos objetos

    expect(response.statusCode).toBe(200);
  });

  it('Should get one player by id - GET /player/:id', async () => {
    const createNewPlayer = await request(app.getHttpServer())
      .post('/player')
      .send(CreatePlayerMock);
    const playerId = createNewPlayer.body.id;
    const response = await request(app.getHttpServer()).get(
      `/player/${playerId}`,
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe(playerId);
    await request(app.getHttpServer()).delete(`/player/${playerId}`);
  });

  it('Should throw 404 getting an unexisting player - GET /player/:id', async () => {
    const createNewPlayer = await request(app.getHttpServer())
      .post('/player')
      .send(CreatePlayerMock);
    const playerId = createNewPlayer.body.id;
    await request(app.getHttpServer()).delete(`/player/${playerId}`);
    const response = await request(app.getHttpServer()).get(
      `/player/${playerId}`,
    );
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('Usuário inexistente');
  });

  it('Should create a player - POST /player', async () => {
    const createNewPlayer = await request(app.getHttpServer())
      .post('/player')
      .send(CreatePlayerMock);

    expect(createNewPlayer.statusCode).toBe(201);
    expect(createNewPlayer.body.username).toBe(CreatePlayerMock.username);
    expect(createNewPlayer.body.name).toBe(CreatePlayerMock.name);
    await request(app.getHttpServer()).delete(
      `/player/${createNewPlayer.body.id}`,
    );
  });

  it('Shouldnt create a player with same username - POST /player', async () => {
    const createNewPlayer = await request(app.getHttpServer())
      .post('/player')
      .send(CreatePlayerMock);

    const samePlayer = await request(app.getHttpServer())
      .post('/player')
      .send(SameUsernamePlayerMock);

    expect(samePlayer.statusCode).toBe(400);

    await request(app.getHttpServer()).delete(`/player/${samePlayer.body.id}`);
    await request(app.getHttpServer()).delete(
      `/player/${createNewPlayer.body.id}`,
    );
  });

  it('Shouldnt create a player without required fields - POST /player', async () => {
    const wrongPlayer = await request(app.getHttpServer())
      .post('/player')
      .send(CreatePlayerUnexistingFieldsMock);
    expect(wrongPlayer.statusCode).toBe(422);
  });

  it('Should update a player - PUT /player', async () => {
    const createNewPlayer = await request(app.getHttpServer())
      .post('/player')
      .send(CreatePlayerMock);

    const updatedPlayer = await request(app.getHttpServer())
      .put(`/player/${createNewPlayer.body.id}`)
      .send(updatePlayerMock);

    expect(updatedPlayer.statusCode).toBe(200);
    expect(updatedPlayer.body.rating_rapid).toBe(10);

    await request(app.getHttpServer()).delete(
      `/player/${createNewPlayer.body.id}`,
    );
  });

  it('Shouldnt update a player that dont exist  - PUT /player', async () => {
    const createNewPlayer = await request(app.getHttpServer())
      .post('/player')
      .send(CreatePlayerMock);

    await request(app.getHttpServer()).delete(
      `/player/${createNewPlayer.body.id}`,
    );
    const updatedPlayer = await request(app.getHttpServer())
      .put(`/player/${createNewPlayer.body.id}`)
      .send(updatePlayerMock);

    expect(updatedPlayer.statusCode).toBe(404);
    expect(updatedPlayer.body.message).toBe('Usuário inexistente');
  });

  it('Should delete a player  - DELETE /player', async () => {
    const createNewPlayer = await request(app.getHttpServer())
      .post('/player')
      .send(CreatePlayerMock);

    const deletedPlayer = await request(app.getHttpServer()).delete(
      `/player/${createNewPlayer.body.id}`,
    );
    expect(deletedPlayer.statusCode).toBe(200);
  });

  it('Shouldnt delete a player that doesnt exist  - PUT /player', async () => {
    const createNewPlayer = await request(app.getHttpServer())
      .post('/player')
      .send(CreatePlayerMock);

    await request(app.getHttpServer()).delete(
      `/player/${createNewPlayer.body.id}`,
    );

    const deletedPlayer = await request(app.getHttpServer()).delete(
      `/player/${createNewPlayer.body.id}`,
    );

    expect(deletedPlayer.statusCode).toBe(404);
    expect(deletedPlayer.body.message).toBe('Usuário inexistente');
  });

  it('Should get the rapid ranking of the players  - GET /player/ranking', async () => {
    const server = app.getHttpServer();
    const createNewPlayer = await request(server)
      .post('/player')
      .send(CreatePlayerMock);

    const createOtherPlayer = await request(server)
      .post('/player')
      .send(CreateOtherPlayerMock);

    await request(server).post('/games').send(CreateGameMock);

    const ranking = await request(server).get('/player/ranking');

    expect(ranking.statusCode).toBe(200);
    expect(ranking.body[0].username).toBe('usernameteste');

    await request(server).delete(`/player/${createNewPlayer.body.id}`);
    await request(server).delete(`/player/${createOtherPlayer.body.id}`);
  }, 50000);

  afterAll(async () => {
    await app.close();
  });
});
