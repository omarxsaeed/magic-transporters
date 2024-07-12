import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Repository,
  UpdateDateColumn,
} from 'typeorm';
import { Mission } from '../mission/mission.entity';
import { MagicMover } from '../magic-mover/magic-mover.entity';

@Entity({ name: 'magic_items' })
export class MagicItem {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  weight: number;

  @ManyToOne(() => MagicMover, (mover) => mover.items)
  mover: MagicMover;

  @ManyToOne(() => Mission, (mission) => mission.items)
  mission: Mission;

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

export type MagicItemRepository = Repository<MagicItem>;
