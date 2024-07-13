import { Module } from '@nestjs/common';
import { MagicItemService } from './magic-item.service';
import { MagicItemController } from './magic-item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MagicItem } from './magic-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MagicItem])],
  controllers: [MagicItemController],
  providers: [MagicItemService],
  exports: [MagicItemService],
})
export class MagicItemModule {}
