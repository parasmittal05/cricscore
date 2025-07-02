import { WebSocketGateway, OnGatewayInit } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { MatchService } from './match.service';

@WebSocketGateway({ cors: true })
export class MatchGateway implements OnGatewayInit {
  constructor(private readonly matchService: MatchService) {}

  afterInit(server: Server) {
    this.matchService.setSocketServer(server);
  }
}