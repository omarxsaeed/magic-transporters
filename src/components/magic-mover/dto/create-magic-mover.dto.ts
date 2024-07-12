import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDefined, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { QuestState } from '../magic-mover.enum';

export class CreateMagicMoverDto {
  @ApiProperty()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  weightLimit: number;

  @ApiProperty()
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  energy: number;

  @ApiPropertyOptional({ type: QuestState, enum: QuestState, default: QuestState.RESTING })
  @IsEnum(QuestState)
  @IsOptional()
  questState: QuestState;
}
