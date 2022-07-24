import { DomainError } from '../../../shared/utils/hex/DomainError';
import { DomainErrorCode } from '../../../shared/domain/errors/DomainErrorCode';
import { EmailAddress } from '../EmailAddress';

export class AccountNotRegistered extends DomainError {
  constructor(email: EmailAddress) {
    super({
      code: DomainErrorCode.ACCOUNT_NOT_REGISTERED,
      message: `Account with email ${email.getValue()} is not registered.`,
    });
  }
}
