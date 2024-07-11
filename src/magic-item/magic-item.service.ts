import { Injectable } from '@nestjs/common';
import { CreateMagicItemDto } from './dto/create-magic-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MagicItem, MagicItemRepository } from './magic-item.entity';

@Injectable()
export class MagicItemService {
  constructor(@InjectRepository(MagicItem) private readonly magicItemRepository: MagicItemRepository) {}

  createMagicItem(createMagicItemDto: CreateMagicItemDto) {
    return this.magicItemRepository.save(createMagicItemDto);
  }
}
