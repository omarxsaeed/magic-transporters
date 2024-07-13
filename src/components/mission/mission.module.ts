import { Module } from '@nestjs/common';
import { MissionService } from './mission.service';
import { MissionController } from './mission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mission } from './mission.entity';
import { MagicMoverModule } from '../magic-mover/magic-mover.module';

@Module({
  imports: [TypeOrmModule.forFeature([Mission]), MagicMoverModule],
  controllers: [MissionController],
  providers: [MissionService],
})
export class MissionModule {}
