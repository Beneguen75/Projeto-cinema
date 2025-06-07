import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';

// O UpdateMovieDto herda todas as regras de validação do CreateMovieDto,
// mas o PartialType torna todos os campos opcionais.
export class UpdateMovieDto extends PartialType(CreateMovieDto) {}