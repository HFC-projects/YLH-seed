import { Body, Controller, Post, Request } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserDto } from './dto/user.dto';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService){}

  @Post("login")
  async login(@Request() req, @Body() user: LoginDto): Promise<UserDto>{
    return this.authService.login(user);
  }
}
