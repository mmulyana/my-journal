import { Injectable, NotFoundException } from '@nestjs/common'

import { PrismaService } from 'src/shared/prisma/prisma.service'
import { CreateJournalDto } from './dto/create-journal.dto'
import { UpdateJournalDto } from './dto/update-journal.dto'

@Injectable()
export class JournalService {
  constructor(private db: PrismaService) {}

  async create(data: CreateJournalDto) {
    return await this.db.journal.create({ data })
  }

  async findAll() {
    return await this.db.journal.findMany()
  }

  async findOne(id: string) {
    const data = await this.db.journal.findUnique({ where: { id } })
    if (!data) {
      throw new NotFoundException('Journal not found')
    }
    return data
  }

  async update(id: string, data: UpdateJournalDto) {
    return await this.db.journal.update({ where: { id }, data })
  }

  async remove(id: string) {
    await this.db.journal.delete({ where: { id } })
  }
}
