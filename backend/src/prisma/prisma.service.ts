import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    // Este método é chamado automaticamente quando o módulo é inicializado.
    // Aqui nos conectamos ao banco de dados.
    await this.$connect();
  }

  // No futuro, se precisarmos de lógica de desconexão limpa, podemos adicionar aqui.
  // async enableShutdownHooks(app: INestApplication) {
  //   this.$on('beforeExit', async () => {
  //     await app.close();
  //   });
  // }
}