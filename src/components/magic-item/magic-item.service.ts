import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMagicItemDto } from './dto/create-magic-item.dto';
import { UpdateMagicItemDto } from './dto/update-magic-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MagicItem, MagicItemRepository } from './magic-item.entity';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class MagicItemService {
  constructor(
    @InjectRepository(MagicItem) private readonly magicItemRepository: MagicItemRepository,
    private readonly logger: PinoLogger,
  ) {
    this.logger.setContext(MagicItemService.name);
  }

  async createMagicItem(createMagicItemDto: CreateMagicItemDto) {
    const newMagicItem = await this.magicItemRepository.save(createMagicItemDto);

    this.logger.info(`Magic item created: ${JSON.stringify(newMagicItem)}`);

    return newMagicItem;
  }

  async findAllMagicItems() {
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

    this.logger.info(`Magic item with id ${id} updated: ${JSON.stringify(updateMagicItemDto)}`);

    return this.findOneMagicItem(id);
  }

  async removeMagicItem(id: number) {
    const magicItem = await this.findOneMagicItem(id);

    await this.magicItemRepository.softDelete({ id });

    return {
      status: 'success',
      message: `Magic item ${magicItem.name} with id ${magicItem.id} has been deleted successfully`,
      data: { id: magicItem.id, name: magicItem.name },
    };
  }
}
