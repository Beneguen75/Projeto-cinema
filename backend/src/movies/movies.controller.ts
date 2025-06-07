import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies') // Define que este controller cuidará da rota base '/movies'
export class MoviesController {
  // Injeta o MoviesService no construtor
  constructor(private readonly moviesService: MoviesService) {}

  @Post() // Mapeia para: POST /movies
  create(@Body() createMovieDto: CreateMovieDto) {
    // O @Body() extrai o corpo da requisição e o DTO valida os dados
    return this.moviesService.create(createMovieDto);
  }

  @Get() // Mapeia para: GET /movies
  findAll() {
    return this.moviesService.findAll();
  }

  @Get(':id') // Mapeia para: GET /movies/:id (ex: /movies/123-abc)
  findOne(@Param('id') id: string) {
    // O @Param('id') extrai o parâmetro 'id' da URL
    return this.moviesService.findOne(id);
  }

  @Patch(':id') // Mapeia para: PATCH /movies/:id
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesService.update(id, updateMovieDto);
  }

  @Delete(':id') // Mapeia para: DELETE /movies/:id
  @HttpCode(HttpStatus.NO_CONTENT) // Define que o status de sucesso será 204 No Content
  remove(@Param('id') id: string) {
    return this.moviesService.remove(id);
  }
}