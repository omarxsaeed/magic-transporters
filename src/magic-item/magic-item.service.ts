import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMagicItemDto } from './dto/create-magic-item.dto';
import { UpdateMagicItemDto } from './dto/update-magic-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MagicItem, MagicItemRepository } from './magic-item.entity';

@Injectable()
export class MagicItemService {
  constructor(@InjectRepository(MagicItem) private readonly magicItemRepository: MagicItemRepository) {}

  createMagicItem(createMagicItemDto: CreateMagicItemDto) {
    return this.magicItemRepository.save(createMagicItemDto);
  }

  findAllMagicItems() {
    return this.magicItemRepository.find();
  }

  async findOneMagicItem(id: number): Promise<MagicItem> {
    try {
      const magicItem = await this.magicItemRepository.findOneOrFail({ where: { id } });
      return magicItem;
    } catch {
      throw new NotFoundException(`Magic item with id ${id} not found`);
    }
  }

  async updateMagicItem(id: number, updateMagicItemDto: UpdateMagicItemDto) {
    await this.findOneMagicItem(id);

    await this.magicItemRepository.update({ id }, updateMagicItemDto);

    return this.findOneMagicItem(id);
  }

}
