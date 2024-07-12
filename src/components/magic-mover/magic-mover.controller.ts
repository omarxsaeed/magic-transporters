import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { MagicMoverService } from './magic-mover.service';
import { CreateMagicMoverDto } from './dto/create-magic-mover.dto';
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
    return this.magicMoverService.findOne(id);
  }

  }
}
