import { createClient } from '../../utils/test-client';
import { MARIA } from '../../../src/utils/fixtures/accounts';

describe('POST /api/v1/auth/accounts/registration', () => {
  it('creates the account with an account', async () => {
    const client = await createClient();

    const { body } = await client.registerUser({ id: MARIA.id }).expect(201).run();

    expect(body).toHaveProperty('accessToken');
    expect(body).toHaveProperty('accountId');
  });
});
