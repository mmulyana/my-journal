import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { JournalModule } from './modules/journal/journal.module'
import { PrismaModule } from './shared/prisma/prisma.module'
import { TagModule } from './modules/tag/tag.module';
import { CloudinaryModule } from './shared/cloudinary/cloudinary.module';
import { ImageModule } from './modules/image/image.module';

@Module({
  imports: [JournalModule, PrismaModule, TagModule, CloudinaryModule, ImageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
