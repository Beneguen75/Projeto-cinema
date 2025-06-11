import { IsString, IsNotEmpty, IsInt, IsDateString, IsOptional, IsUrl } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  descricao: string;

  @IsString()
  @IsNotEmpty()
  genero: string;

  @IsString()
  @IsNotEmpty()
  classificacao: string;

  @IsInt()
  @IsNotEmpty()
  duracao: number;

  @IsDateString()
  @IsNotEmpty()
  dataEstreia: string;

  @IsOptional()
  @IsString()
  posterUrl?: string;
}