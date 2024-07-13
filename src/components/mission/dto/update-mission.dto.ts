import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateMissionDto } from './create-mission.dto';

export class UpdateMissionDto extends OmitType(PartialType(CreateMissionDto), ['moverId']) {}
