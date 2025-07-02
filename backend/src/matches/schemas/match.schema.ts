import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MatchDocument = Match & Document;

@Schema()
export class Match {
  @Prop({ unique: true })
  matchId: number;

  @Prop()
  teamA: string;

  @Prop()
  teamB: string;

  @Prop({ default: Date.now })
  startTime: Date;
}

export const MatchSchema = SchemaFactory.createForClass(Match);