import { Connection, MikroORM } from '@mikro-orm/core';
import { TestClient } from './utils/test-client';
import { cleanDatabase } from './utils/database/cleanDatabase';

let connection: Connection;
let orm: MikroORM;

beforeAll(async () => {
  orm = await MikroORM.init();
  const driver = orm.em.getDriver();
  connection = driver.getConnection('write');
});

beforeEach(async () => {
  await cleanDatabase(connection);
});

afterEach(async () => {
  await TestClient.teardownApps();
});

afterAll(async () => {
  await orm.close();
});
