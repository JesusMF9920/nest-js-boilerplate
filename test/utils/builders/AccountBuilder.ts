import { Account } from '../../../src/task/accounts/domain/Account';
import { MARIA } from '../../../src/utils/fixtures/accounts';

export const createAccount = ({
  id = MARIA.id,
  email = MARIA.email,
  password = MARIA.password,
  salt = 'mysalt',
} = {}) =>
  Account.fromPrimitives({
    id,
    email,
    password,
    salt,
  });
