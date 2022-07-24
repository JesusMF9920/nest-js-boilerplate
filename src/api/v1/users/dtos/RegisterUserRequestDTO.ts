import { ApiProperty } from '@nestjs/swagger';
import { MARIA } from '../../../../utils/fixtures/accounts';
import { IsEmail, IsString, IsUUID, MinLength } from 'class-validator';

export class RegisterUserRequestDTO {
  @ApiProperty({ example: MARIA.id })
  @IsUUID(4)
  public readonly id!: string;

  @ApiProperty({ example: MARIA.email })
  @IsEmail()
  public readonly email!: string;

  @ApiProperty({ example: MARIA.password })
  @IsString()
  @MinLength(6)
  public readonly password!: string;
}
