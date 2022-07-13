import { AccountRepository } from '../domain/AccountRepository';
import { createAccount } from '../../../../test/utils/builders/AccountBuilder';
import { Connection, MikroORM } from '@mikro-orm/core';
import { AccountRepositoryMikroORM } from './AccountRepositoryMikroORM';
import { cleanDatabase } from '../../../../test/utils/database/cleanDatabase';

describe('AccountRepository', () => {
  describe('MikroORM', () => {
    let orm: MikroORM;
    let connection: Connection;
    let accountRepository: AccountRepository;
    beforeAll(async () => {
      orm = await MikroORM.init();
      const driver = orm.em.getDriver();
      connection = driver.getConnection('write');
    });
    beforeEach(async () => {
      await cleanDatabase(connection);
      accountRepository = new AccountRepositoryMikroORM(orm);
    });

    afterAll(() => orm.close());

    it('saves the account', async () => {
      expect(await accountRepository.count()).toEqual(0);

      await accountRepository.save(createAccount());

      expect(await accountRepository.count()).toEqual(1);
    });

    it('does not fail when saving twice the account', async () => {
      expect(await accountRepository.count()).toEqual(0);
      const newAccount = createAccount();

      await accountRepository.save(newAccount);
      await accountRepository.save(newAccount);

      const account = await accountRepository.findOneById(newAccount.getId());

      expect(account).toEqual(newAccount);
    });
  });
});
