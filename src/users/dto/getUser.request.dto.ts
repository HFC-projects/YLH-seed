import { Expose, Type } from 'class-transformer';
import { IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetUserRequestDto {
  @Expose()
  @IsInt()
  @Type(() => Number)
  @ApiProperty({required: true, description: 'the user id'})
  id?: number
}
