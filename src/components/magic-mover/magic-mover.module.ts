import { Module } from '@nestjs/common';
import { MagicMoverService } from './magic-mover.service';
import { MagicMoverController } from './magic-mover.controller';

@Module({
  controllers: [MagicMoverController],
  providers: [MagicMoverService],
})
export class MagicMoverModule {}
