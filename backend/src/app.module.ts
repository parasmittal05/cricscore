// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MatchController } from './matches/match.controller';
import { MatchService } from './matches/match.service';
import { CounterService } from './matches/counter.service';
import { MatchGateway } from './matches/match.gateway';
import { Match, MatchSchema } from './matches/schemas/match.schema';
import { Commentary, CommentarySchema } from './matches/schemas/commentary.schema';
import { Counter, CounterSchema } from './matches/schemas/counter.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/cricket-app'),
    MongooseModule.forFeature([
      { name: Match.name, schema: MatchSchema },
      { name: Commentary.name, schema: CommentarySchema },
      { name: Counter.name, schema: CounterSchema },
    ]),
  ],
  controllers: [MatchController],
  providers: [MatchService, CounterService, MatchGateway],
})
export class AppModule {}