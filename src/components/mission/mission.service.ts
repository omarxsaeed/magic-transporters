import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMissionDto } from './dto/create-mission.dto';
import { UpdateMissionDto } from './dto/update-mission.dto';
import { PinoLogger } from 'nestjs-pino';
import { MagicMoverService } from '../magic-mover/magic-mover.service';
import { QuestState } from '../magic-mover/magic-mover.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Mission, MissionRepository } from './mission.entity';
import { MissionStatus } from './mission.enum';

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

  async endMission(id: number, updateMissionDto: UpdateMissionDto) {
    const mission = await this.findOneMission(id);

    if (mission.status === MissionStatus.DONE) {
      throw new BadRequestException('Mission is already done');
    }

    if (updateMissionDto.status === MissionStatus.STARTED && mission.status === MissionStatus.STARTED) {
      throw new BadRequestException('Mission already started');
    }

    await this.magicMoverService.unloadMagicMover(mission.mover.id);

    mission.items = [];
    mission.status = updateMissionDto.status;

    await this.missionRepository.save(mission);

    this.logger.info(`Mission with id ${id} is done successfully`);

    return mission;
  }
}
