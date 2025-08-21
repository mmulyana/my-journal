import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'

import { PrismaService } from 'src/shared/prisma/prisma.service'
import { CreateJournalDto } from './dto/create-journal.dto'
import { UpdateJournalDto } from './dto/update-journal.dto'
import { AddTagDto } from './dto/add-tag.dto'
import { Prisma } from '@prisma/client'

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
    const data = await this.db.journal.findUnique({
      where: { id },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
    })
    if (!data) {
      throw new NotFoundException('Journal not found')
    }
    return { ...data, tags: data.tags.map((i) => i.tag) }
  }

  async update(id: string, data: UpdateJournalDto) {
    return await this.db.journal.update({ where: { id }, data })
  }

  async remove(id: string) {
    await this.db.journal.delete({ where: { id } })
  }

  async addTag(id: string, data: AddTagDto) {
    console.log('data', data)
    const journal = await this.db.journal.findUnique({ where: { id } })
    if (!journal) {
      throw new NotFoundException('Journal not found')
    }
    try {
      await this.db.journalTags.createMany({
        data: data.ids.map((i) => ({
          journalId: journal.id,
          tagId: i,
        })),
      })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          throw new BadRequestException(
            'Invalid journalId or tagId (foreign key failed)',
          )
        }
      }
      throw error
    }
  }
  async removeTag(id: string, data: AddTagDto) {
    const journal = await this.db.journal.findUnique({ where: { id } })
    if (!journal) {
      throw new NotFoundException('Journal not found')
    }
    await this.db.journalTags.deleteMany({
      where: {
        journalId: journal.id,
        tagId: {
          in: data.ids,
        },
      },
    })
  }
}
