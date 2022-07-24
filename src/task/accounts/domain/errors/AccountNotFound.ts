import { DomainError } from '../../../shared/utils/hex/DomainError';
import { DomainErrorCode } from '../../../shared/domain/errors/DomainErrorCode';
import { AccountId } from '../../../shared/domain/ids/AccountId';
import { EmailAddress } from '../EmailAddress';

export class AccountNotFound extends DomainError {
  constructor(accountIdOrEmail: AccountId | EmailAddress) {
    super({
      code: DomainErrorCode.ACCOUNT_NOT_FOUND,
      message: `Could not find an account with identifier: ${accountIdOrEmail.getValue()}`,
    });
  }
}
