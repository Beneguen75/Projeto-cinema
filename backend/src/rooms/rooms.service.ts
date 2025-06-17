import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from '././entities/room.entity';

@Injectable()
export class RoomsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRoomDto: CreateRoomDto): Promise<Room> {
    return this.prisma.room.create({ data: createRoomDto });
  }

  async findAll(): Promise<Room[]> {
    return this.prisma.room.findMany();
  }

  async findOne(id: string): Promise<Room> {
    const room = await this.prisma.room.findUnique({ where: { id } });
    if (!room) {
      throw new NotFoundException(`Sala com ID "${id}" não encontrada.`);
    }
    return room;
  }

  async update(id: string, updateRoomDto: UpdateRoomDto): Promise<Room> {
    await this.findOne(id); 
    return this.prisma.room.update({
      where: { id },
      data: updateRoomDto,
    });
  }

  async remove(id: string): Promise<Room> {
    await this.findOne(id); 
    return this.prisma.room.delete({ where: { id } });
  }
}