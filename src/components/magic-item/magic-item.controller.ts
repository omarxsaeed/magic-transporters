import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MagicItemService } from './magic-item.service';
import { CreateMagicItemDto } from './dto/create-magic-item.dto';
import { UpdateMagicItemDto } from './dto/update-magic-item.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Magic Item')
@Controller('magic-item')
export class MagicItemController {
  constructor(private readonly magicItemService: MagicItemService) {}

  @Post()
  async create(@Body() createMagicItemDto: CreateMagicItemDto) {
    return this.magicItemService.createMagicItem(createMagicItemDto);
  }

  @Get()
  findAll() {
    return this.magicItemService.findAllMagicItems();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.magicItemService.findOneMagicItem(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateMagicItemDto: UpdateMagicItemDto) {
    return this.magicItemService.updateMagicItem(id, updateMagicItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.magicItemService.removeMagicItem(id);
  }
}
