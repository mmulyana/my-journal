import { ApiProperty } from "@nestjs/swagger"

export class Journal {
  @ApiProperty()
  id: string

  @ApiProperty()
  title: string

  @ApiProperty()
  content: string

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date
}
