import { createZodDto } from 'nestjs-zod'

import { journalSchema } from '../schema'

export class CreateJournalDto extends createZodDto(journalSchema) {}
