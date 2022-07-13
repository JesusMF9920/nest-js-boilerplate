import { Injectable } from '@nestjs/common';
import { AccountRepository } from '../domain/AccountRepository';
import { EntityRepository, MikroORM } from '@mikro-orm/core';
import { AccountEntity } from './AccountRepsitoryMikroORM/Account.entity';
import { Account } from '../domain/Account';
import { AccountId } from '../../shared/domain/ids/AccountId';
import { EmailAddress } from '../domain/EmailAddress';

@Injectable()
export class AccountRepositoryMikroORM implements AccountRepository {
  private accountRepository: EntityRepository<AccountEntity>;

  constructor(private readonly orm: MikroORM) {
    this.accountRepository = this.orm.em.getRepository(AccountEntity);
  }

  async save(account: Account): Promise<void> {
    const accountEntity = AccountEntity.fromPrimitives(account.toPrimitives());
    const id = accountEntity.id;

    if (await this.existsEntityWith(id)) {
      await this.accountRepository.nativeUpdate({ id }, accountEntity);
    } else {
      await this.accountRepository.persistAndFlush(accountEntity);
    }
  }

  async findOneById(accountId: AccountId): Promise<Account | undefined> {
    const accountEntity = await this.accountRepository.findOne({ id: accountId.toPrimitives() });

    if (accountEntity) {
      return AccountEntity.toDomain(accountEntity);
    }
  }

  async findOneByEmail(email: EmailAddress): Promise<Account | undefined> {
    const accountEntity = await this.accountRepository.findOne({ id: email.getValue() });

    if (accountEntity) {
      return AccountEntity.toDomain(accountEntity);
    }
  }

  count(): Promise<number> {
    return this.accountRepository.count();
  }

  private async existsEntityWith(id: string): Promise<boolean> {
    return this.accountRepository.count({ id }).then(Boolean);
  }
}
