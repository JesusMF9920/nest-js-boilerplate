import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from '../../shared/utils/hex/UseCase';
import { ACCOUNT_REPOSITORY_TOKEN, AccountRepository } from '../domain/AccountRepository';
import { AccountId } from '../../shared/domain/ids/AccountId';
import { EmailAddress } from '../domain/EmailAddress';
import { AccountPassword } from '../domain/AccountPassword';
import { DuplicatedIdConflict } from '../../shared/domain/errors/DuplicatedIdConflict';
import { Account } from '../domain/Account';
import { AccountAlreadyRegisteredError } from '../domain/errors/AccountAlreadyRegisteredError';
import { AccountType } from '../domain/AccountType';

@Injectable()
export class AccountRegistrar extends UseCase {
  constructor(@Inject(ACCOUNT_REPOSITORY_TOKEN) private accountRepository: AccountRepository) {
    super();
  }

  async execute(
    accountId: AccountId,
    emailAddress: EmailAddress,
    password: AccountPassword,
  ): Promise<void> {
    const alreadyRegisteredId = await this.accountRepository.findOneById(accountId);
    if (alreadyRegisteredId) throw new DuplicatedIdConflict(Account, accountId);

    const alreadyRegisterMail = await this.accountRepository.findOneByEmail(emailAddress);
    if (alreadyRegisterMail) throw new AccountAlreadyRegisteredError(emailAddress);

    const account = Account.create(accountId, emailAddress, password, AccountType.GENERAL_USER);
    await this.accountRepository.save(account);
  }
}
