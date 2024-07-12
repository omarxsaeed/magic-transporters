import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMagicMoverDto } from './dto/create-magic-mover.dto';
import { UpdateMagicMoverDto } from './dto/update-magic-mover.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MagicMover, MagicMoverRepository } from './magic-mover.entity';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class MagicMoverService {
  constructor(
    @InjectRepository(MagicMover)
    private magicMoverRepository: MagicMoverRepository,
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
    return this.magicMoverRepository.find();
  }

  async findOneMagicMover(id: number) {
    try {
      const magicMover = await this.magicMoverRepository.findOneOrFail({ where: { id } });
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
}
