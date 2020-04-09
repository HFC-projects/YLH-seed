import { Expose, Type } from 'class-transformer';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {

  @Expose()
  @IsString()
  @Type(() => String)
  @ApiProperty({required: true, description: 'the user name'})
  readonly username: string;

  @Expose()
  @IsString()
  @Type(() => String)
  @ApiProperty({required: true, description: 'the user password'})
  readonly password: string;
}
