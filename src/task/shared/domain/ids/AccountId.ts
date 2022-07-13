import { DomainId } from './DomainId';

export class AccountId extends DomainId {
  static fromString(uuid: string) {
    return new AccountId(uuid);
  }
}
