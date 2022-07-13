import { Module } from '@nestjs/common';
import { ACCOUNT_REPOSITORY_TOKEN } from '../domain/AccountRepository';
import { AccountRepositoryMikroORM } from './AccountRepositoryMikroORM';

@Module({
  controllers: [],
  providers: [
    {
      provide: ACCOUNT_REPOSITORY_TOKEN,
      useClass: AccountRepositoryMikroORM,
    },
  ],
  exports: [ACCOUNT_REPOSITORY_TOKEN],
})
export class AccountRepositoryModule {}
