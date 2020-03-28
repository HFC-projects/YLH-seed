import { Injectable } from '@nestjs/common';
import {UsersService } from '../users/users.service';
import { User } from '../interfaces/user.interface';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from './dto/user.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(username:string, pass: string): Promise<User>{
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(login: LoginDto) {
    const user = await this.validateUser(login.username, login.password);
    const payload = { username: user.username, userId: user.userId };
    return {
      ...user,
      accessToken: this.jwtService.sign(payload),
    };
  }
}
