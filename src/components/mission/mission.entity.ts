import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MagicItem } from 'src/components/magic-item/magic-item.entity';
import { MagicMover } from 'src/components/magic-mover/magic-mover.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Repository,
  UpdateDateColumn,
} from 'typeorm';
import { MissionStatus } from './mission.enum';

@Entity({ name: 'missions' })
export class Mission {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: MissionStatus, default: MissionStatus.STARTED })
  status: MissionStatus;

  @ManyToOne(() => MagicMover, (mover) => mover.missions)
  mover: MagicMover;

  @OneToMany(() => MagicItem, (item) => item.mission, {
    cascade: true,
    onUpdate: 'SET NULL',
  })
  items: MagicItem[];

  @ApiProperty()
  @CreateDateColumn()
  startedAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  endedAt: Date;

  @ApiPropertyOptional()
  @DeleteDateColumn()
  deletedAt!: Date;
}

export type MissionRepository = Repository<Mission>;
