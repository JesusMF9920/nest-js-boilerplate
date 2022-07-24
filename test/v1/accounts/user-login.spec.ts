import { createClient } from '../../utils/test-client';
import exp from 'constants';
import { HttpStatus } from '@nestjs/common';

describe('POST /api/v1/auth/user/login', () => {
  it('Logs in the account with email and passwotd', async () => {
    const client = await createClient();

    await client.registerUser().expect(201).run();

    const { body, status } = await client.loginUser().run();

    expect(status).toBe(200);
    expect(body).toHaveProperty('accessToken');
    expect(body).toHaveProperty('accountId');
  });
  it('return a valid access token', async () => {
    const client = await createClient();
    await client.registerUser().expect(HttpStatus.CREATED).run();

    const { body } = await client.loginUser().expect(HttpStatus.OK).run();

    await client.validateAuth({ jwt: body.accessToken }).expect(HttpStatus.OK).run();
  });
  it('responds with an error if email does not exist', async () => {
    const client = await createClient();
    const { status, body } = await client.loginUser().run();

    expect(status).toBe(HttpStatus.UNAUTHORIZED);
    expect(body.code).toBe('ACCOUNT_AUTHENTICATION_FAILED');
  });
  it('responds with an error if password does not match', async () => {
    const client = await createClient();
    await client.registerUser({ password: 'password1' }).expect(HttpStatus.CREATED).run();

    const { status } = await client.loginUser({ password: 'password2' }).run();
    expect(status).toBe(HttpStatus.UNAUTHORIZED);
  });
});
