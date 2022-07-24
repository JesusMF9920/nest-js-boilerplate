import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { Account, AccountPrimitives } from '../../domain/Account';
import { AccountId } from '../../../shared/domain/ids/AccountId';
import { EmailAddress } from '../../domain/EmailAddress';
import { AccountHashedPassword } from '../../domain/AccountHashedPassword';
import { AccountSalt } from '../../domain/AccountSalt';
import { AccountType } from '../../domain/AccountType';

@Entity({ tableName: 'accounts' })
export class AccountEntity {
  @PrimaryKey({ type: 'uuid' })
  id: string;

  @Property()
  email: string;

  @Property()
  password: string;

  @Property()
  salt: string;

  @Property({ type: 'string' })
  accountType: AccountType;

  constructor(p: AccountPrimitives) {
    this.id = p.id;
    this.email = p.email;
    this.password = p.password;
    this.salt = p.salt;
    this.accountType = p.accountType;
  }

  static fromPrimitives(p: AccountPrimitives) {
    return new AccountEntity(p);
  }

  static async toDomain(accountEntity: AccountEntity): Promise<Account> {
    return new Account(
      AccountId.fromString(accountEntity.id),
      new EmailAddress(accountEntity.email),
      new AccountHashedPassword(accountEntity.password),
      new AccountSalt(accountEntity.salt),
      accountEntity.accountType,
    );
  }
}
