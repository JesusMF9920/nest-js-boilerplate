import { SingleValueObject } from '../../shared/utils/hex/SingleValueObject';

export class AccountHashedPassword extends SingleValueObject<string> {
  equals(password: AccountHashedPassword) {
    return this.getValue() === password.getValue();
  }
}
