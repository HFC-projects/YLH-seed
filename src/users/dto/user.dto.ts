import { Expose } from 'class-transformer';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserDto {

  @Expose()
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  id: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  username: string;

  @Expose()
  @IsString()
  @IsOptional()
  accessToken?: string;

  @Expose()
  @IsString()
  @IsOptional()
  password?: string;
}
