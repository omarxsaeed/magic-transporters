import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { MagicItemModule } from './components/magic-item/magic-item.module';
import { LoggerModule } from 'nestjs-pino';
import { MagicMoverModule } from './components/magic-mover/magic-mover.module';
import { MissionModule } from './components/mission/mission.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: +configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: ['dist/**/*.entity.js'],
        autoLoadEntities: true,
        namingStrategy: new SnakeNamingStrategy(),
        logging: true,
        logger: 'advanced-console',
        synchronize: true,
        ssl: {
          rejectUnauthorized: false,
        },
      }),
      inject: [ConfigService],
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            singleLine: true,
          },
        },
      },
    }),
    MagicItemModule,
    MagicMoverModule,
    MissionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
