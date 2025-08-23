import { Module } from '@nestjs/common'
import { ImageController } from './image.controller'
import { ImageService } from './image.service'
import { CloudinaryModule } from 'src/shared/cloudinary/cloudinary.module'

@Module({
  imports: [CloudinaryModule],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
