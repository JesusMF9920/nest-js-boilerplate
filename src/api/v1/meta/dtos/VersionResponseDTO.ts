import { ApiProperty } from '@nestjs/swagger';

export class VersionResponseDTO {
  @ApiProperty({ example: 'be17eff37d10227d8cb0163dc0a63c463c596e24' })
  hash!: string;
}
