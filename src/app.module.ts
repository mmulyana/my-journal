import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { JournalModule } from './modules/journal/journal.module'
import { PrismaModule } from './shared/prisma/prisma.module'

@Module({
  imports: [JournalModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
