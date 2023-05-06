import { Body, Controller, Get, Post } from '@nestjs/common';
import { GamesService } from './games.service';

@Controller('games')
export class GamesController {
    constructor(private gamesService: GamesService){}


    @Get()
    async getAllGames(){
        return await this.gamesService.getAllGames();
    }

    @Post()
    async createGame(@Body() data:any):Promise<any>{
        return await this.gamesService.createGame(data)
    }
}
