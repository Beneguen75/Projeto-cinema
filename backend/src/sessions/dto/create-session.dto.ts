import { IsDateString, IsNotEmpty, IsNumber, IsPositive, IsString, IsUUID } from 'class-validator';

export class CreateSessionDto {
  @IsDateString()
  @IsNotEmpty()
  dataHora: string;

  @IsNumber()
  @IsPositive()
  preco: number;

  @IsString()
  @IsNotEmpty()
  idioma: string;

  @IsString()
  @IsNotEmpty()
  formato: string;

  @IsUUID()
  @IsNotEmpty()
  movieId: string;

  @IsUUID()
  @IsNotEmpty()
  roomId: string;
}