import * as crypto from 'crypto';
import { SingleValueObject } from '../../shared/utils/hex/SingleValueObject';

export class AccountSalt extends SingleValueObject<string> {
  static getRandom() {
    const randomString = crypto.randomBytes(32).toString('hex');
    return new AccountSalt(randomString);
  }
}
