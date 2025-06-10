import { IsInt, IsNotEmpty, IsPositive, IsString, MinLength } from 'class-validator';

export class CreateRoomDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  nome: string;

  @IsInt()
  @IsPositive()
  capacidade: number;

  @IsString()
  @IsNotEmpty()
  tipo: string;
}