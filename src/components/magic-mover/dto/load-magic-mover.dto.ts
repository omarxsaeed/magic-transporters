import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsInt, Min } from 'class-validator';

export class LoadMagicMoverDto {
  @ApiProperty({ description: 'Array of item IDs to load onto the Magic Mover', type: [Number] })
  @IsArray()
  @ArrayMinSize(1)
  @IsInt({ each: true })
  @Min(1, { each: true })
  itemsIds: number[];
}
