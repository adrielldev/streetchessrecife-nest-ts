export interface BodyPostPlayerDto {
  name: string;
  username: string;
}

export interface BodyUpdatePlayerDto extends BodyPostPlayerDto{
  victories?:string;
  loses?:string;
  draws?:string;
	rating_rapid?: number,

  
}