import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  private readonly users: UserDto[];

  constructor(){
    this.users = [
      {
        userId: '1',
        username: 'meni',
        password: '123',
      },
      {
        userId: '2',
        username: 'chris',
        password: 'secret',
      },
      {
        userId: '3',
        username: 'maria',
        password: 'guess',
      },
    ];
  }
  async findByName(username: string){
    return this.users.find(user => user.username === username);
  }

  async findById(id: string){
    return this.users.find(user => user.userId === id);
  }
}
