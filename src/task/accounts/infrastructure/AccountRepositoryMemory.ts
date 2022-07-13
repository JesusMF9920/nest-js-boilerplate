import { AccountRepository } from '../domain/AccountRepository';
import { Injectable } from '@nestjs/common';
import { Account } from '../domain/Account';
import { AccountId } from '../../shared/domain/ids/AccountId';
import { EmailAddress } from '../domain/EmailAddress';

@Injectable()
export class AccountRepositoryMemory implements AccountRepository {
  public accounts: Account[] = [];

  private clone(account: Account): Account {
    return Account.fromPrimitives(account.toPrimitives());
  }

  public async save(account: Account): Promise<void> {
    const index = this.accounts.findIndex((a) => a.hasId(account.getId()));

    if (index < 0) {
      this.accounts.push(account);
    } else {
      this.accounts[index] = account;
    }
  }

  public async findOneById(accountId: AccountId): Promise<Account | undefined> {
    const account = this.accounts.find((a) => a.hasId(accountId));
    return account ? this.clone(account) : undefined;
  }

  public async findOneByEmail(email: EmailAddress): Promise<Account | undefined> {
    return this.accounts.find((account) => account.getEmail().equals(email));
  }

  public async count(): Promise<number> {
    return this.accounts.length;
  }
}
