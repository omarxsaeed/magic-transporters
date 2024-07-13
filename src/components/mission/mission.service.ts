import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMissionDto } from './dto/create-mission.dto';
import { PinoLogger } from 'nestjs-pino';
import { MagicMoverService } from '../magic-mover/magic-mover.service';
import { QuestState } from '../magic-mover/magic-mover.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Mission, MissionRepository } from './mission.entity';

@Injectable()
export class MissionService {
  constructor(
    @InjectRepository(Mission) private missionRepository: MissionRepository,
    private readonly magicMoverService: MagicMoverService,
    private readonly logger: PinoLogger,
  ) {
    this.logger.setContext(MissionService.name);
  }
  async createMission(createMissionDto: CreateMissionDto) {
    const magicMover = await this.magicMoverService.findOneMagicMover(createMissionDto.moverId);

    if (magicMover.questState === QuestState.ON_MISSION) {
      throw new BadRequestException('Magic Mover is already on a mission');
    }

    const newMission = this.missionRepository.create({
      mover: magicMover,
      status: createMissionDto.status,
      items: magicMover.items,
    });

    await this.magicMoverService.updateMagicMover(createMissionDto.moverId, { questState: QuestState.ON_MISSION });

    this.logger.info(`Magic mover ${magicMover.name} with id ${magicMover.id} has started a mission`);

    return this.missionRepository.save(newMission);
  }

  async findAllMissions() {
    return this.missionRepository.find({ relations: ['mover', 'items'] });
  }

  async findOneMission(id: number) {
    try {
      const mission = await this.missionRepository.findOneOrFail({ where: { id }, relations: ['mover', 'items'] });
      return mission;
    } catch {
      throw new NotFoundException(`Mission with id ${id} not found`);
    }
  }
}
