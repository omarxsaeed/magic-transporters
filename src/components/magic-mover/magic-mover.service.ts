import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMagicMoverDto } from './dto/create-magic-mover.dto';
import { UpdateMagicMoverDto } from './dto/update-magic-mover.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MagicMover, MagicMoverRepository } from './magic-mover.entity';
import { PinoLogger } from 'nestjs-pino';
import { QuestState } from './magic-mover.enum';
import { MagicItemService } from '../magic-item/magic-item.service';

@Injectable()
export class MagicMoverService {
  constructor(
    @InjectRepository(MagicMover)
    private magicMoverRepository: MagicMoverRepository,
    private readonly magicItemService: MagicItemService,
    private readonly logger: PinoLogger,
  ) {
    this.logger.setContext(MagicMoverService.name);
  }

  async createMagicMover(createMagicMoverDto: CreateMagicMoverDto) {
    const newMagicMover = this.magicMoverRepository.create(createMagicMoverDto);

    this.logger.info(`Magic mover added: ${JSON.stringify(newMagicMover)}`);

    return this.magicMoverRepository.save(newMagicMover);
  }

  async findAll() {
    return this.magicMoverRepository.find({ relations: ['items'] });
  }

  async findOneMagicMover(id: number) {
    try {
      const magicMover = await this.magicMoverRepository.findOneOrFail({ where: { id }, relations: ['items'] });
      return magicMover;
    } catch {
      throw new NotFoundException(`Magic mover with id ${id} not found`);
    }
  }

  async updateMagicMover(id: number, updateMagicMoverDto: UpdateMagicMoverDto) {
    await this.findOneMagicMover(id);

    await this.magicMoverRepository.update({ id }, updateMagicMoverDto);

    this.logger.info(`Magic mover with id ${id} updated: ${JSON.stringify(updateMagicMoverDto)}`);

    return this.findOneMagicMover(id);
  }

  async loadMagicMover(id: number, itemsIds: number[]) {
    const magicMover = await this.findOneMagicMover(id);

    // Check for items availability
    const items = await this.magicItemService.checkLoadedMagicItems(itemsIds);

    // Calculate total weight of items to be loaded
    const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);

    // Check if total weight exceeds mover's weight limit
    if (totalWeight > magicMover.weightLimit) {
      throw new BadRequestException("Total item weight exceeds mover's weight limit");
    }

    magicMover.items = items;
    magicMover.questState = QuestState.LOADING;

    // Save the updated magicMover entity
    await this.magicMoverRepository.save(magicMover);

    this.logger.info(`Magic mover ${magicMover.name} with id ${id} is loaded with items: ${items}}`);

    return this.findOneMagicMover(id);
  }

  async removeMagicMover(id: number) {
    const magicMover = await this.findOneMagicMover(id);

    await this.magicMoverRepository.softDelete({ id });

    return {
      status: 'success',
      message: `Magic Mover ${magicMover.name} with id ${magicMover.id} has been deleted successfully`,
      data: { id: magicMover.id, name: magicMover.name },
    };
  }
}
