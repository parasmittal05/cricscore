import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { MatchService } from './match.service';

@Controller('matches')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Post('start')
  startMatch(@Body() body: any) {
    return this.matchService.startMatch(body);
  }

  @Post(':id/commentary')
  addCommentary(@Param('id') id: string, @Body() body: any) {
    return this.matchService.addCommentary(+id, body);
  }

  @Get(':id')
  getMatch(@Param('id') id: string) {
    return this.matchService.getMatchDetails(+id);
  }

 
  @Get()
  getAllMatches() {
    return this.matchService.getAllMatches();
  }
}