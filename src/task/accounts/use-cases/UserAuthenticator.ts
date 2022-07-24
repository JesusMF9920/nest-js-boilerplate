import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from '../../shared/utils/hex/UseCase';
import { ACCOUNT_REPOSITORY_TOKEN, AccountRepository } from '../domain/AccountRepository';
import { JWT_SERVICE_TOKEN, JwtService } from '../../shared/services/jwt/domain/JwtService';
import { EmailAddress } from '../domain/EmailAddress';
import { AccountPassword } from '../domain/AccountPassword';
import { AccountAuthenticationFailed } from '../domain/errors/AccountAuthenticationFailed';
import { AccountType } from '../domain/AccountType';

@Injectable()
export class UserAuthenticator extends UseCase {
  constructor(
    @Inject(ACCOUNT_REPOSITORY_TOKEN) private accountRepository: AccountRepository,
    @Inject(JWT_SERVICE_TOKEN) private jwtService: JwtService,
  ) {
    super();
  }

  async execute(email: EmailAddress, password: AccountPassword) {
    const account = await this.accountRepository.findOneByEmail(email);

    if (!account || !account.passwordMatches(password)) throw new AccountAuthenticationFailed();

    const accessToken = await this.jwtService.sign(account.getId(), AccountType.GENERAL_USER);
    return { account, accessToken };
  }
}
