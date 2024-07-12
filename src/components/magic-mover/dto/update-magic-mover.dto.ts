import { PartialType } from '@nestjs/swagger';
import { CreateMagicMoverDto } from './create-magic-mover.dto';

export class UpdateMagicMoverDto extends PartialType(CreateMagicMoverDto) {}
