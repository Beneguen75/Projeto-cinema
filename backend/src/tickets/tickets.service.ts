import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTicketDto } from './dto/create-ticket.dto';

@Injectable()
export class TicketsService {
  constructor(private readonly prisma: PrismaService) {}

  findTicketsBySession(sessionId: string) {
    return this.prisma.ticket.findMany({
      where: { sessionId },
    });
  }

  async create(createTicketDto: CreateTicketDto) {
    const { sessionId, seatNumbers } = createTicketDto;

    return this.prisma.$transaction(async (prisma) => {
      const existingTickets = await prisma.ticket.findMany({
        where: {
          sessionId,
          seatNumber: { in: seatNumbers },
        },
      });

      if (existingTickets.length > 0) {
        const occupiedSeats = existingTickets.map((t) => t.seatNumber);
        throw new ConflictException(
          `Os seguintes assentos já estão ocupados: ${occupiedSeats.join(', ')}`,
        );
      }

      const ticketsData = seatNumbers.map((seat) => ({
        sessionId,
        seatNumber: seat,
      }));

      await prisma.ticket.createMany({
        data: ticketsData,
      });

      return {
        message: 'Ingressos comprados com sucesso!',
        count: ticketsData.length,
      };
    });
  }
}