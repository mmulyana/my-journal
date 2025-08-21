import { Injectable } from '@nestjs/common'
import { CreateTagDto } from './dto/create-tag.dto'
import { UpdateTagDto } from './dto/update-tag.dto'
import { PrismaService } from 'src/shared/prisma/prisma.service'

@Injectable()
export class TagService {
  constructor(private db: PrismaService) {}

  async create(data: CreateTagDto) {
    return await this.db.tag.create({ data })
  }

  async findAll() {
    return await this.db.tag.findMany()
  }

  async findOne(id: string) {
    return await this.db.tag.findUnique({ where: { id } })
  }

  async update(id: string, data: UpdateTagDto) {
    return await this.db.tag.update({ where: { id }, data })
  }

  async remove(id: string) {
    await this.db.tag.delete({ where: { id } })
  }
}
