import { Expose, Type } from 'class-transformer';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetUserRequestDto {

  @Expose()
  @IsString()
  @Type(() => String)
  @ApiProperty({required: true, description: 'the user id'})
  id?: number
}
