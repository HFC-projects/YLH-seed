import { Injectable } from '@nestjs/common';
import { UserModel } from './user.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UsersService {

  constructor(@InjectModel(UserModel) private readonly model: ReturnModelType<typeof UserModel>) {
  }

  async findById(id: string): Promise<UserDto> {
    const user = await this.model.findById(id);

    return user.toJSON();
  }

  async findByName(username: string) : Promise<UserDto>{
    const user = await this.model.findOne({username});

    return user.toJSON();
  }

  async create(createUserDto: CreateUserDto) : Promise<UserDto>{
    const newUser = await this.model.create(createUserDto);
    return newUser.toJSON();
  }
}
