import { DomainError } from '../../utils/hex/DomainError';
import { DomainErrorCode } from './DomainErrorCode';
import { Uuid } from '../Uuid';
import { getClassNameOf } from '../../utils/getClassNameFrom';

export class DuplicatedIdConflict extends DomainError {
  constructor(element: any, id: Uuid) {
    super({
      code: DomainErrorCode.DUPLICATED_ID_CONFLICT,
      message: `${getClassNameOf(element)} with ID: ${id.getValue()} already exists.`,
    });
  }
}
