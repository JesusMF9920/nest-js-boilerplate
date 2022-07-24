import { Options } from '@mikro-orm/core';
import { config } from './config';
import { AccountEntity } from './task/accounts/infrastructure/AccountRepsitoryMikroORM/Account.entity';

const mikroORMConfig: Options = {
  type: 'postgresql',
  host: config.database.host,
  port: config.database.port,
  user: config.database.username,
  password: config.database.password,
  dbName: config.database.database,
  entities: [AccountEntity],
  migrations: {
    path: './migrations',
  },
};

export default mikroORMConfig;
