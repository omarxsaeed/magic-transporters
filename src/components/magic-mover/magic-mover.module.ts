import { Module } from '@nestjs/common';
import { MagicMoverService } from './magic-mover.service';
import { MagicMoverController } from './magic-mover.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MagicMover } from './magic-mover.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MagicMover])],
  controllers: [MagicMoverController],
  providers: [MagicMoverService],
})
export class MagicMoverModule {}
