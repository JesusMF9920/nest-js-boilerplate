import { createClient } from '../../utils/test-client';
import { MARIA } from '../../../src/utils/fixtures/accounts';

describe('POST /api/v1/auth/accounts/registration', () => {
  it('creates the account with an account', async () => {
    const client = await createClient();

    const { body } = await client.registerUser({ id: MARIA.id }).expect(201).run();

    expect(body).toHaveProperty('accessToken');
    expect(body).toHaveProperty('accountId');
  });

  it('throws an error when registering with an preexisting id', async () => {
    const client = await createClient();

    await client.registerUser({ id: MARIA.id }).expect(201).run();
    await client.registerUser({ id: MARIA.id, email: 'jesusfndz437@gmail.com' }).expect(409).run();
  });
  it('throws an error if there are two registrations with the same email', async () => {
    const client = await createClient();

    const AN_EMAIL = 'jordimoreno@gmail.com';
    const SAME_EMAIL_CAPITALIZED = 'Jordimoreno@gmail.com';

    await client.registerUser({ email: AN_EMAIL }).expect(201).run();

    await client.registerUser({ email: SAME_EMAIL_CAPITALIZED }).expect(409).run();
  });
});
