import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { PrismaService } from '../prisma/prisma.service'; 

@Injectable()
export class MoviesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createMovieDto: CreateMovieDto) {
  const { dataEstreia, ...restOfDto } = createMovieDto;

  return this.prisma.movie.create({
    data: {
      ...restOfDto, 
      dataEstreia: new Date(dataEstreia), 
    },
  });
}

  findAll() {
    return this.prisma.movie.findMany(); 
  }

  async findOne(id: string) {
    const movie = await this.prisma.movie.findUnique({
      where: { id }, 
    });
    if (!movie) {
      throw new NotFoundException(`Filme com o ID "${id}" não encontrado.`);
    }
    return movie;
  }

  async update(id: string, updateMovieDto: UpdateMovieDto) {
  await this.findOne(id);

  const { dataEstreia, ...restOfDto } = updateMovieDto;

  const dataToUpdate: any = { ...restOfDto };
  if (dataEstreia) {
    dataToUpdate.dataEstreia = new Date(dataEstreia);
  }

  return this.prisma.movie.update({
    where: { id },
    data: dataToUpdate, 
  });
}

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.movie.delete({
      where: { id },
    });
  }
}