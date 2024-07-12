import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Repository,
  UpdateDateColumn,
} from 'typeorm';
import { QuestState } from './magic-mover.enum';
import { Mission } from '../mission/mission.entity';

@Entity({ name: 'magic_movers' })
export class MagicMover {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  weightLimit: number;

  @ApiProperty()
  @Column()
  energy: number;

  @ApiPropertyOptional()
  @Column({
    type: 'enum',
    enum: QuestState,
    default: QuestState.RESTING,
  })
  questState: QuestState;

  @OneToMany(() => Mission, (mission) => mission.mover)
  missions: Mission[];

  @ApiProperty()
  @CreateDateColumn()
  createdAt!: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt!: Date;

  @ApiPropertyOptional()
  @DeleteDateColumn()
  deletedAt!: Date;
}

export type MagicMoverRepository = Repository<MagicMover>;
