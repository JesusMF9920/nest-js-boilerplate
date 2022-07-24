import { mapDomainError, Mapper } from './boilerplate/mapDomainError';
import { AccountNotFound } from '../../../accounts/domain/errors/AccountNotFound';
import { ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AccountNotRegistered } from '../../../accounts/domain/errors/AccountNotRegistered';
import { AccountAuthenticationFailed } from '../../../accounts/domain/errors/AccountAuthenticationFailed';
import { DuplicatedIdConflict } from '../../domain/errors/DuplicatedIdConflict';
import { AccountAlreadyRegisteredError } from '../../../accounts/domain/errors/AccountAlreadyRegisteredError';

export class DomainToInfrastructureMapper {
  getMappings(): Mapper[] {
    return [
      mapDomainError(AccountAlreadyRegisteredError).to(ConflictException),
      mapDomainError(AccountAuthenticationFailed).to(UnauthorizedException),
      mapDomainError(AccountNotFound).to(NotFoundException),
      mapDomainError(AccountNotRegistered).to(NotFoundException),
      mapDomainError(DuplicatedIdConflict).to(ConflictException),
    ];
  }
}
