import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Counter, CounterDocument } from './schemas/counter.schema';
import { Model } from 'mongoose';

@Injectable()
export class CounterService {
  constructor(@InjectModel(Counter.name) private counterModel: Model<CounterDocument>) {}

  async getNextSequence(name: string): Promise<number> {
    const result = await this.counterModel.findOneAndUpdate(
      { name },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    return result.seq;
  }
}