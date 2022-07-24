import { Body, Controller, Inject, Post } from '@nestjs/common';
import { UserAuthenticator } from '../../../task/accounts/use-cases/UserAuthenticator';
import { JWT_SERVICE_TOKEN, JwtService } from '../../../task/shared/services/jwt/domain/JwtService';
import { DocumentationTags, Endpoint } from '../../../utils/Endpoint';
import { LoginUserResponseDTO } from './dtos/LoginUserResponseDTO';
import { LoginUserRequestDTO } from './dtos/LoginUserRequestDTO';
import { EmailAddress } from '../../../task/accounts/domain/EmailAddress';
import { AccountPassword } from '../../../task/accounts/domain/AccountPassword';

@Controller()
export class UserLoginController {
  constructor(
    private userAuthenticator: UserAuthenticator,
    @Inject(JWT_SERVICE_TOKEN) private jwtService: JwtService,
  ) {}

  @Endpoint({
    status: 200,
    description: 'The uses has login successfully',
    type: LoginUserResponseDTO,
    tags: [DocumentationTags.USERS],
  })
  @Post('/api/v1/auth/user/login')
  async execute(@Body() { email, password }: LoginUserRequestDTO): Promise<LoginUserResponseDTO> {
    const { account, accessToken } = await this.userAuthenticator.execute(
      new EmailAddress(email),
      new AccountPassword(password),
    );

    return {
      accessToken: accessToken.getValue(),
      accountId: account.getId().toPrimitives(),
    };
  }
}
