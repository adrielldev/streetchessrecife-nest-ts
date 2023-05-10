import { Player } from "@prisma/client";

export interface ResponseGetGameDto {
    id:number;
    date_game:Date;
    winner:string;
    type_of_game:string;
    rating_winner:number;
    rating_loser:number;
    white_player_id:number;
    black_player_id:number;
    black_player: Player;
    white_player: Player;
}