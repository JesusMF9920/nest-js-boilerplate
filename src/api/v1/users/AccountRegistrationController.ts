import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AccountRegistrar } from '../../../task/accounts/use-cases/AccountRegistrar';
import { JWT_SERVICE_TOKEN, JwtService } from '../../../task/shared/services/jwt/domain/JwtService';
import { DocumentationTags, Endpoint } from '../../../utils/Endpoint';
import { RegisterUserRequestDTO } from './dtos/RegisterUserRequestDTO';
import { RegisterUserResponseDTO } from './dtos/RegisterUserResponseDTO';
import { AccountId } from '../../../task/shared/domain/ids/AccountId';
import { EmailAddress } from '../../../task/accounts/domain/EmailAddress';
import { AccountPassword } from '../../../task/accounts/domain/AccountPassword';
import { AccountType } from '../../../task/accounts/domain/AccountType';

@Controller()
export class AccountRegistrationController {
  constructor(
    private accountRegistrar: AccountRegistrar,
    @Inject(JWT_SERVICE_TOKEN) private jwtService: JwtService,
  ) {}

  @Endpoint({
    status: 201,
    description: 'The user has been successfully created.',
    type: RegisterUserRequestDTO,
    tags: [DocumentationTags.USERS],
  })
  @Post('/api/v1/auth/account/registration')
  async execute(
    @Body() { id, password, email }: RegisterUserRequestDTO,
  ): Promise<RegisterUserResponseDTO> {
    const accountId = AccountId.fromString(id);

    await this.accountRegistrar.execute(
      accountId,
      new EmailAddress(email),
      new AccountPassword(password),
    );

    const accessToken = await this.jwtService.sign(accountId, AccountType.GENERAL_USER);
    return {
      accessToken: accessToken.getValue(),
      accountId: id,
    };
  }
}
