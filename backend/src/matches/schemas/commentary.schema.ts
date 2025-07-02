import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CommentaryDocument = Commentary & Document;

@Schema()
export class Commentary {
  @Prop()
  matchId: number;

  @Prop()
  over: number;

  @Prop()
  ball: number;

  @Prop()
  eventType: string; 

  @Prop()
  message: string;

   @Prop()
  runs: number;
}

export const CommentarySchema = SchemaFactory.createForClass(Commentary);