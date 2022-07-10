import { createClient } from '../../utils/test-client';
import { HttpStatus } from '@nestjs/common';

describe('Meta', () => {
  it('GET /meta/healthz', async () => {
    const client = await createClient();

    await client.healthz().expect(HttpStatus.OK).run();
  });

  it('GET /meta/simulate-error', async () => {
    const client = await createClient();

    await client.simulateError().expect(HttpStatus.INTERNAL_SERVER_ERROR).run();
  });
});
