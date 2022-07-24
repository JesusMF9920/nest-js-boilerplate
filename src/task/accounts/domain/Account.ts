import { AccountHashedPassword } from './AccountHashedPassword';
import { AccountPassword } from './AccountPassword';
import { AccountSalt } from './AccountSalt';
import { EmailAddress } from './EmailAddress';
import { AggregateRoot } from '../../shared/utils/hex/AggregateRoot';
import { AccountId } from '../../shared/domain/ids/AccountId';
import { AccountType } from './AccountType';

export type AccountPrimitives = ReturnType<Account['toPrimitives']>;

export class Account extends AggregateRoot {
  constructor(
    private accountId: AccountId,
    private readonly email: EmailAddress,
    private password: AccountHashedPassword,
    private salt: AccountSalt,
    private accountType: AccountType,
  ) {
    super();
  }

  public static fromPrimitives(p: AccountPrimitives): Account {
    return new Account(
      new AccountId(p.id),
      new EmailAddress(p.email),
      new AccountHashedPassword(p.password),
      new AccountSalt(p.salt),
      p.accountType,
    );
  }

  public static create(
    accountId: AccountId,
    email: EmailAddress,
    password: AccountPassword,
    accountType: AccountType,
  ) {
    const salt = AccountSalt.getRandom();
    const account = new Account(accountId, email, password.hash(salt), salt, accountType);

    return account;
  }

  getId() {
    return this.accountId;
  }

  resetPassword(password: AccountPassword) {
    this.salt = AccountSalt.getRandom();
    this.password = password.hash(this.salt);
  }

  passwordMatches(accountPassword: AccountPassword) {
    return accountPassword.hash(this.salt).equals(this.password);
  }

  /**
   * @deprecated TODO: Method only used by tests
   */
  hasId(accountId: AccountId) {
    return this.accountId.equals(accountId);
  }

  /**
   * @deprecated TODO: Method only used by tests
   */
  getEmail() {
    return this.email;
  }

  toPrimitives() {
    return {
      id: this.accountId.toPrimitives(),
      email: this.email.getValue(),
      password: this.password.getValue(),
      salt: this.salt.getValue(),
      accountType: this.accountType,
    };
  }
}
