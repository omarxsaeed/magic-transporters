import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MissionService } from './mission.service';
import { CreateMissionDto } from './dto/create-mission.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Mission')
@Controller('mission')
export class MissionController {
  constructor(private readonly missionService: MissionService) {}

  @Post()
  async create(@Body() createMissionDto: CreateMissionDto) {
    return this.missionService.createMission(createMissionDto);
  }

  @Get()
  async findAll() {
    return this.missionService.findAllMissions();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.missionService.findOneMission(id);
  }
}
