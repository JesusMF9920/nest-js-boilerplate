import { ApiProperty } from '@nestjs/swagger';
import { MARIA } from '../../../../utils/fixtures/accounts';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginUserRequestDTO {
  @ApiProperty({ example: MARIA.email })
  @IsEmail()
  public readonly email!: string;

  @ApiProperty({ example: MARIA.password })
  @IsString()
  @MinLength(6)
  public readonly password!: string;
}
