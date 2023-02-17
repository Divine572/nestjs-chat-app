import { UsersService } from './../users/users.service';
import { Socket } from 'socket.io';
import { AuthService } from './../auth/auth.service';
import { Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class ChatsService {
    constructor(private authService: AuthService) {}

    async getUserFromSocket(socket: Socket) {
        let auth_token = socket.handshake.headers.authorization;
        // get the token itself without "Bearer"
        auth_token = auth_token.split(' ')[1];

        const user = this.authService.getUserFromAuthenticationToken(
            auth_token
        );
        
        if (!user) {
            throw new WsException('Invalid credentials.');
        }

        return user;
    }

    
}
