import {
  BodyPostPlayerDto,
  BodyUpdatePlayerDto,
} from 'src/player/dto/bodyPostPlayer.dto';
import { object, string, number, date, InferType } from 'yup';

export const CreatePlayerSchema = object<BodyPostPlayerDto>({
  name: string().required('Nome é obrigatório'),
  username: string().required('Username é obrigatório'),
}).required();

export const UpdatePlayerSchema = object<BodyUpdatePlayerDto>({
  vitorias: string().optional(),
  derrotas: string().optional(),
  empates: string().optional(),
  rating_rapid: number().min(0, 'Mínimo é 0 para o rating'),
});
