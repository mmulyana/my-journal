import { createZodDto } from 'nestjs-zod'
import { tagSchema } from '../schema'

export class CreateTagDto extends createZodDto(tagSchema) {}
