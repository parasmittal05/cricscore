import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Match, MatchDocument } from './schemas/match.schema';
import { Commentary, CommentaryDocument } from './schemas/commentary.schema';
import { Model } from 'mongoose';
import { CounterService } from './counter.service';
import { Server } from 'socket.io';

@Injectable()
export class MatchService {
  private io: Server;

  constructor(
    @InjectModel(Match.name) private matchModel: Model<MatchDocument>,
    @InjectModel(Commentary.name) private commentaryModel: Model<CommentaryDocument>,
    private readonly counterService: CounterService
  ) {}

  setSocketServer(server: Server) {
    this.io = server;
  }

  async startMatch(data: any) {
    const matchId = await this.counterService.getNextSequence('matchId');
    const match = new this.matchModel({ matchId, teamA: data.teamA, teamB: data.teamB });
    return match.save();
  }

  async addCommentary(matchId: number, data: any) {
    const commentary = new this.commentaryModel({ matchId, ...data });
    const saved = await commentary.save();

    if (this.io) {
      this.io.emit(`match-${matchId}`, saved);
    }

    return saved;
  }

  async getMatchDetails(matchId: number) {
    const match = await this.matchModel.findOne({ matchId });
    const commentary = await this.commentaryModel.find({ matchId }).sort({ over: 1, ball: 1 });
    return { match, commentary };
  }

  async getAllMatches() {
    return this.matchModel.find({}, { matchId: 1, teamA: 1, teamB: 1, _id: 0 });
  }
}
