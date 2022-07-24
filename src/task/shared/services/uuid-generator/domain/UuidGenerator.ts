import { Uuid } from '../../../domain/Uuid';

export const UUID_GENERATOR_TOKEN = 'UuidGenerator';

export interface UuidGenerator {
  generateV4(): Uuid;
}
