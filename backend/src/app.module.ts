import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { MoviesModule } from './movies/movies.module';
import { RoomsModule } from './rooms/rooms.module';
import { SessionsModule } from './sessions/sessions.module';
import { TicketsModule } from './tickets/tickets.module';

@Module({
  imports: [PrismaModule, MoviesModule, RoomsModule, SessionsModule, TicketsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
