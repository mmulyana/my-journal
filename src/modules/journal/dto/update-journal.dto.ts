import { createZodDto } from 'nestjs-zod';

import { journalSchema } from '../schema';

export class UpdateJournalDto extends createZodDto(journalSchema.partial()) {}
