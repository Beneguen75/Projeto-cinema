import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { MoviesModule } from './movies/movies.module';
import { RoomsModule } from './rooms/rooms.module';

@Module({
  imports: [PrismaModule, MoviesModule, RoomsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
