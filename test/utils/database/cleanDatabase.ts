import { Connection } from '@mikro-orm/core';

export async function cleanDatabase(connection: Connection) {
  await connection.execute('DELETE FROM accounts;');
}
