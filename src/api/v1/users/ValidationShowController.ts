import { Controller, Get, Inject, Request, UnauthorizedException } from '@nestjs/common';
import {
  ACCOUNT_REPOSITORY_TOKEN,
  AccountRepository,
} from '../../../task/accounts/domain/AccountRepository';
import { DocumentationTags, Endpoint } from '../../../utils/Endpoint';
import { StatusResponseDTO } from '../meta/dtos/StatusResponseDTO';
import { GuardWithJwt } from '../../../task/shared/services/jwt/infraestructure/JwtAuthGuard';
import { All_ACCOUNT_TYPES } from '../../../task/accounts/domain/AccountType';
import { RequestWithJwtPayload } from '../../../task/shared/services/jwt/domain/JwtPayload';
import { AccountId } from '../../../task/shared/domain/ids/AccountId';

@Controller()
export class ValidationShowController {
  constructor(@Inject(ACCOUNT_REPOSITORY_TOKEN) private accountRepository: AccountRepository) {}

  @Endpoint({
    status: 200,
    description: 'Return Ok if the JWT is correct',
    type: StatusResponseDTO,
    tags: [DocumentationTags.USERS],
  })
  @GuardWithJwt(All_ACCOUNT_TYPES)
  @Get('/api/v1/auth/validation')
  async execute(@Request() { jwtPayload }: RequestWithJwtPayload): Promise<StatusResponseDTO> {
    const user = await this.accountRepository.findOneById(AccountId.fromString(jwtPayload.sub));

    if (!user) throw new UnauthorizedException();

    return StatusResponseDTO.ok();
  }
}
