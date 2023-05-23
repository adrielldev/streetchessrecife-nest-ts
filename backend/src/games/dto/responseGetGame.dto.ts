import { Player } from "@prisma/client";

export interface ResponseGetGameDto {
    id:number;
    date_game:Date;
    result:string;
    rating_white_player:number;
    rating_black_player:number;
    white_player_id:number;
    black_player_id:number;
    black_player: Player;
    white_player: Player;
}