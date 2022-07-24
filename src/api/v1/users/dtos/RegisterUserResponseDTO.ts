import { ApiProperty } from '@nestjs/swagger';
import { MARIA } from '../../../../utils/fixtures/accounts';

export class RegisterUserResponseDTO {
  @ApiProperty({ example: MARIA.jwt })
  public readonly accessToken!: string;

  @ApiProperty({ example: MARIA.id })
  public readonly accountId!: string;
}
