import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMagicItemDto {
  @ApiProperty()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  weight: number;
}
