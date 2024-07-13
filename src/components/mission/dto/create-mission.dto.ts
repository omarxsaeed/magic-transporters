import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDefined, IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { MissionStatus } from '../mission.enum';

export class CreateMissionDto {
  @ApiProperty()
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  moverId: number;

  @ApiPropertyOptional({ type: MissionStatus, enum: MissionStatus, default: MissionStatus.STARTED })
  @IsEnum(MissionStatus)
  @IsOptional()
  status: MissionStatus;
}
