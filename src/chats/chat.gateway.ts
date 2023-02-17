import { ChatsService } from './chats.service';
import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    ConnectedSocket
  } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
   
@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection {
    @WebSocketServer()
    server: Server;

    constructor(private chatsService: ChatsService) {}

    async handleConnection(socket: Socket) {
        await this.chatsService.getUserFromSocket(socket)
    }
   
    @SubscribeMessage('send_message')
    async listenForMessages(@MessageBody() message: string, @ConnectedSocket() socket: Socket) {

        const user = await this.chatsService.getUserFromSocket(socket)
        this.server.sockets.emit('receive_message', {
            message,
            user
        });
    }
}