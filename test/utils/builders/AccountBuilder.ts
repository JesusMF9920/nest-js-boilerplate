import { Account } from '../../../src/task/accounts/domain/Account';
import { MARIA } from '../../../src/utils/fixtures/accounts';

export const createAccount = ({
  id = MARIA.id,
  email = MARIA.email,
  password = MARIA.password,
  salt = 'mysalt',
  accountType = MARIA.accountType,
} = {}) =>
  Account.fromPrimitives({
    id,
    email,
    password,
    salt,
    accountType,
  });
