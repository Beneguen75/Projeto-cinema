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
    return this.prisma.movie.create({
      data: createMovieDto, // Os dados vêm do DTO validado
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
    // Primeiro, verifica se o filme existe
    await this.findOne(id);

    return this.prisma.movie.update({
      where: { id },
      data: updateMovieDto, // Os dados para atualização vêm do DTO
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