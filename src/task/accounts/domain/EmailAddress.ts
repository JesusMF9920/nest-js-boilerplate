import { SingleValueObject } from '../../shared/utils/hex/SingleValueObject';

export class EmailAddress extends SingleValueObject<string> {
  constructor(email: string) {
    super(email.toLowerCase());
  }
}
