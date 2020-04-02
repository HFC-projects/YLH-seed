import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginRequestDto } from '../../../users/dto/login.request.dto';
import { UsersService } from '../../../users/users.service';
import { UserDto } from '../../../users/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(username:string, pass: string): Promise<UserDto>{
    const user = await this.usersService.findByName(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('The user does not exist');
  }

  async login(login: LoginRequestDto) {
    const user = await this.validateUser(login.username, login.password);
    const payload = { username: user.username, userId: user.userId };
    return {
      ...user,
      accessToken: this.jwtService.sign(payload),
    };
  }
}
