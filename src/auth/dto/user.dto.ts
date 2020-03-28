import { User } from '../../interfaces/user.interface';

export class UserDto implements User{
  userId: number;
  username: string;
  accessToken: string
}
