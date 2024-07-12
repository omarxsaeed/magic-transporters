import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MagicMoverService } from './magic-mover.service';
import { CreateMagicMoverDto } from './dto/create-magic-mover.dto';
import { UpdateMagicMoverDto } from './dto/update-magic-mover.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Magic Mover')
@Controller('magic-mover')
export class MagicMoverController {
  constructor(private readonly magicMoverService: MagicMoverService) {}

  @Post()
  async create(@Body() createMagicMoverDto: CreateMagicMoverDto) {
    return this.magicMoverService.createMagicMover(createMagicMoverDto);
  }

  @Get()
  async findAll() {
    return this.magicMoverService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.magicMoverService.findOneMagicMover(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateMagicMoverDto: UpdateMagicMoverDto) {
    return this.magicMoverService.updateMagicMover(id, updateMagicMoverDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.magicMoverService.removeMagicMover(id);
  }
}
