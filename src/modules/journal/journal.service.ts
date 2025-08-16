import { Injectable } from '@nestjs/common'
import { CreateJournalDto } from './dto/create-journal.dto'
import { UpdateJournalDto } from './dto/update-journal.dto'
import { PrismaService } from 'src/shared/prisma/prisma.service'

@Injectable()
export class JournalService {
  constructor(private db: PrismaService) {}

  async create(data: CreateJournalDto) {
    console.log('data', data)
  }

  findAll() {
    return `This action returns all journal`
  }

  findOne(id: number) {
    return `This action returns a #${id} journal`
  }

  update(id: number, updateJournalDto: UpdateJournalDto) {
    return `This action updates a #${id} journal`
  }

  remove(id: number) {
    return `This action removes a #${id} journal`
  }
}
