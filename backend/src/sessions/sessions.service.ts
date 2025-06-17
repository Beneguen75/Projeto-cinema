import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';

@Injectable()
export class SessionsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createSessionDto: CreateSessionDto) {
    const { dataHora, ...restOfDto } = createSessionDto;
    return this.prisma.session.create({
      data: {
        ...restOfDto,
        dataHora: new Date(dataHora),
      },
    });
  }

  findAll() {
    return this.prisma.session.findMany({
      include: {
        movie: true, 
        room: true,  
      },
    });
  }

  async findOne(id: string) {
    const session = await this.prisma.session.findUnique({
      where: { id },
      include: {
        movie: true,
        room: true,
      },
    });

    if (!session) {
      throw new NotFoundException(`Sessão com o ID "${id}" não encontrada.`);
    }
    return session;
  }

  async update(id: string, updateSessionDto: UpdateSessionDto) {
    await this.findOne(id);
    const { dataHora, ...restOfDto } = updateSessionDto;
    const dataToUpdate: any = { ...restOfDto };

    if (dataHora) {
      dataToUpdate.dataHora = new Date(dataHora);
    }

    return this.prisma.session.update({
      where: { id },
      data: dataToUpdate,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.session.delete({ where: { id } });
  }
}