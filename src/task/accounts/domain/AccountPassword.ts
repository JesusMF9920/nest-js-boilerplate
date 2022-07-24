import * as crypto from 'crypto';
import { SingleValueObject } from '../../shared/utils/hex/SingleValueObject';
import { AccountHashedPassword } from './AccountHashedPassword';
import { AccountSalt } from './AccountSalt';

export class AccountPassword extends SingleValueObject<string> {
  hash(salt: AccountSalt): AccountHashedPassword {
    const hashedPassword = crypto
      .createHmac('sha512', salt.getValue())
      .update(this.getValue())
      .digest('hex');

    return new AccountHashedPassword(hashedPassword);
  }
}
