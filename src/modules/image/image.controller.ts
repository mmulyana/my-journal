import { FileInterceptor } from '@nestjs/platform-express'
import {
  Post,
  Request,
  Controller,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'

import { ResponseMessage } from 'src/shared/utils/response-message.decorator'
import { ImageService } from './image.service'

@Controller('image')
export class ImageController {
  constructor(private readonly service: ImageService) {}

  @Post()
  @ResponseMessage('Image successfully uploaded')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@Request() req, @UploadedFile() file: Express.Multer.File) {
    return await this.service.upload(file)
  }
}
