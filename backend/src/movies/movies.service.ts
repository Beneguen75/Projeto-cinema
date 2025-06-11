import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { PrismaService } from '../prisma/prisma.service'; // Importe nosso PrismaService

@Injectable()
export class MoviesService {
  // Injeta o PrismaService no construtor para que possamos usá-lo nesta classe
  constructor(private readonly prisma: PrismaService) {}

  // --- Método para CRIAR um novo filme ---
  create(createMovieDto: CreateMovieDto) {
  // Desestruturamos o DTO para poder manipular a data
  const { dataEstreia, ...restOfDto } = createMovieDto;

  return this.prisma.movie.create({
    data: {
      ...restOfDto, // Mantém todos os outros dados
      dataEstreia: new Date(dataEstreia), // <-- Converte a string de data para um objeto Date
    },
  });
}

  // --- Método para BUSCAR TODOS os filmes ---
  findAll() {
    return this.prisma.movie.findMany(); // Busca todos os registros da tabela Movie
  }

  // --- Método para BUSCAR UM filme pelo ID ---
  async findOne(id: string) {
    const movie = await this.prisma.movie.findUnique({
      where: { id }, // Busca pelo ID único
    });
    if (!movie) {
      // Se o filme não for encontrado, lança um erro 404
      throw new NotFoundException(`Filme com o ID "${id}" não encontrado.`);
    }
    return movie;
  }

  // --- Método para ATUALIZAR um filme pelo ID ---
  async update(id: string, updateMovieDto: UpdateMovieDto) {
  await this.findOne(id);

  // Desestrutura para tratar a data, se ela foi enviada
  const { dataEstreia, ...restOfDto } = updateMovieDto;

  // Cria o objeto de dados, convertendo a data apenas se ela existir
  const dataToUpdate: any = { ...restOfDto };
  if (dataEstreia) {
    dataToUpdate.dataEstreia = new Date(dataEstreia);
  }

  return this.prisma.movie.update({
    where: { id },
    data: dataToUpdate, // Usa os dados tratados
  });
}

  // --- Método para REMOVER um filme pelo ID ---
  async remove(id: string) {
    // Primeiro, verifica se o filme existe
    await this.findOne(id);

    return this.prisma.movie.delete({
      where: { id },
    });
  }
}