import { UuidGenerator } from '../domain/UuidGenerator';
import { Uuid } from '../../../domain/Uuid';

export class UuidGeneratorFixed implements UuidGenerator {
  private lastConsumeUuid = '????????-????-????-????-????????????';

  constructor(
    private uuidList: string[] = [
      '00000000-0000-0000-0000-000000000000',
      '11111111-1111-1111-1111-111111111111',
      '22222222-2222-2222-2222-222222222222',
      '33333333-3333-3333-3333-333333333333',
      '44444444-4444-4444-4444-444444444444',
      '55555555-5555-5555-5555-555555555555',
      '66666666-6666-6666-6666-666666666666',
      '77777777-7777-7777-7777-777777777777',
      '88888888-8888-8888-8888-888888888888',
      '99999999-9999-9999-9999-999999999999',
      'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
      'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
      'cccccccc-cccc-cccc-cccc-cccccccccccc',
      'dddddddd-dddd-dddd-dddd-dddddddddddd',
      'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee',
      'ffffffff-ffff-ffff-ffff-ffffffffffff',
    ],
  ) {}

  generateV4(): Uuid {
    const uuid = this.uuidList.shift();
    if (!uuid) throw new Error('Run out of fixed uuids');

    this.lastConsumeUuid = uuid;

    return new Uuid(uuid);
  }
}
