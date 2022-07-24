import { DomainError } from '../../../shared/utils/hex/DomainError';
import { DomainErrorCode } from '../../../shared/domain/errors/DomainErrorCode';

export class AccountAuthenticationFailed extends DomainError {
  constructor() {
    super({
      code: DomainErrorCode.ACCOUNT_AUTHENTICATION_FAILED,
      message: `Either the password is wrong or the account does not exists`,
    });
  }
}
