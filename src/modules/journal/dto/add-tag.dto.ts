import { createZodDto } from 'nestjs-zod'
import { tagJournalSchema } from '../schema'

export class AddTagDto extends createZodDto(tagJournalSchema) {}
