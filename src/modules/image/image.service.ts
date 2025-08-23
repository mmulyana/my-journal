import { Injectable } from '@nestjs/common'
import { CloudinaryService } from 'src/shared/cloudinary/cloudinary.service'

@Injectable()
export class ImageService {
  constructor(private CloudinaryService: CloudinaryService) {}

  async upload(file?: Express.Multer.File) {
    let image: string | undefined

    if (file) {
      image = await this.CloudinaryService.UploadImageStream(file)
    }

    return {
      image,
    }
  }
}
