import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/createUser.dto';

@ApiBearerAuth()
@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private usersService: UsersService) {

  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async getUser(@Param('id') id: string): Promise<UserDto> {
    const user = await this.usersService.findById(id);
    const {password, ...result} = user;
    return result;
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserDto>{
    const user = await this.usersService.create(createUserDto);

    const {password, ...result} = user;

    return result;
  }
}
