import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginRequestDto } from './users/dto/login.request.dto';
import { UserDto } from './users/dto/user.dto';
import { AuthService } from './core/services/auth/auth.service';

@ApiBearerAuth()
@Controller()
@ApiTags('general')
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getHello(): string {
    return "Hello world";
  }

  @Post("login")
  async login(@Request() req, @Body() user: LoginRequestDto): Promise<UserDto>{
    return this.authService.login(user);
  }
}
