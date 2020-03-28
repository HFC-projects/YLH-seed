import { Injectable } from '@nestjs/common';
import { User } from '../interfaces/user.interface';

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor(){
    this.users = [
      {
        userId: 1,
        username: 'meni',
        password: '123',
      },
      {
        userId: 2,
        username: 'chris',
        password: 'secret',
      },
      {
        userId: 3,
        username: 'maria',
        password: 'guess',
      },
    ];
  }
  async findOne(username: string){
    return this.users.find(user => user.username === username);
  }
}
