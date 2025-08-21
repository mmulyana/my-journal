import z from 'zod'

export const journalSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  updatedAt: z.date().optional(),
  isFavorite: z.coerce.boolean().default(false),
})

export const tagJournalSchema = z.object({
  ids: z.string().array(),
})
