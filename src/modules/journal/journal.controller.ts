import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Controller,
} from '@nestjs/common'

import { ResponseMessage } from 'src/shared/utils/response-message.decorator'
import { CreateJournalDto } from './dto/create-journal.dto'
import { UpdateJournalDto } from './dto/update-journal.dto'
import { JournalService } from './journal.service'
import { AddTagDto } from './dto/add-tag.dto'

@Controller('journal')
export class JournalController {
  constructor(private readonly journalService: JournalService) {}

  @Post()
  @ResponseMessage('Journal created successfully')
  create(@Body() createJournalDto: CreateJournalDto) {
    return this.journalService.create(createJournalDto)
  }

  @Get()
  @ResponseMessage('Journal fetched successfully')
  findAll() {
    return this.journalService.findAll()
  }

  @Get(':id')
  @ResponseMessage('Journal fetched successfully')
  findOne(@Param('id') id: string) {
    return this.journalService.findOne(id)
  }

  @Patch(':id')
  @ResponseMessage('Journal updated successfully')
  update(@Param('id') id: string, @Body() updateJournalDto: UpdateJournalDto) {
    return this.journalService.update(id, updateJournalDto)
  }

  @Delete(':id')
  @ResponseMessage('Journal deleted successfully')
  remove(@Param('id') id: string) {
    return this.journalService.remove(id)
  }

  @Post(':id/tags/add')
  @ResponseMessage('Tag successfully added')
  addTag(@Param('id') id: string, @Body() addTagDto: AddTagDto) {
    return this.journalService.addTag(id, addTagDto)
  }
  @Post(':id/tags/remove')
  @ResponseMessage('Tag successfully removed')
  removeTag(@Param('id') id: string, @Body() addTagDto: AddTagDto) {
    return this.journalService.removeTag(id, addTagDto)
  }
}
