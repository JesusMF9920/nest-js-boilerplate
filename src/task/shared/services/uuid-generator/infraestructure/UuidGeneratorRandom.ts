import { UuidGenerator } from '../domain/UuidGenerator';
import { Uuid } from '../../../domain/Uuid';
import { generateUuid } from '../../../utils/generate-uuid';

export class UuidGeneratorRandom implements UuidGenerator {
  generateV4(): Uuid {
    return new Uuid(generateUuid());
  }
}
