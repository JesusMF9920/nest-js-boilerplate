import { Account } from './Account';
import { AccountId } from '../../shared/domain/ids/AccountId';
import { EmailAddress } from './EmailAddress';

export const ACCOUNT_REPOSITORY_TOKEN = 'AccountRepositoryToken';

export interface AccountRepository {
  save(account: Account): Promise<void>;
  findOneById(accountId: AccountId): Promise<Account | undefined>;
  findOneByEmail(email: EmailAddress): Promise<Account | undefined>;
  count(): Promise<number>;
}
