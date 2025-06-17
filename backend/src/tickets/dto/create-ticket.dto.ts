import { IsArray, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateTicketDto {
  @IsUUID()
  @IsNotEmpty()
  sessionId: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  seatNumbers: string[];
}