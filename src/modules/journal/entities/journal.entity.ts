import { ApiProperty } from '@nestjs/swagger'
import { JournalTags, Tag } from '@prisma/client'

export class Journal {
  @ApiProperty()
  id: string

  @ApiProperty()
  title: string

  @ApiProperty()
  content: string

  @ApiProperty()
  isFavorite: boolean

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date

  @ApiProperty()
  tags: JournalTags & {
    tag: Tag
  }
}
