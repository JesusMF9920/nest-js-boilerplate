import { DomainError } from '../../../shared/utils/hex/DomainError';
import { EmailAddress } from '../EmailAddress';
import { DomainErrorCode } from '../../../shared/domain/errors/DomainErrorCode';

export class AccountAlreadyRegisteredError extends DomainError {
  constructor(email: EmailAddress) {
    super({
      code: DomainErrorCode.ACCOUNT_ALREADY_REGISTERED_ERROR,
      message: `Account with email: ${email.getValue()} is already registered`,
    });
  }
}
