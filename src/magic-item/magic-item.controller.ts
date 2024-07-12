import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { MagicItemService } from './magic-item.service';
import { CreateMagicItemDto } from './dto/create-magic-item.dto';

@Controller('magic-item')
export class MagicItemController {
  constructor(private readonly magicItemService: MagicItemService) {}

  @Post()
  create(@Body() createMagicItemDto: CreateMagicItemDto) {
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
}
