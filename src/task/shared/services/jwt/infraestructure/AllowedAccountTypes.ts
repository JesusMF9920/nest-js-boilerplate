import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AccountType } from '../../../../accounts/domain/AccountType';
import { RequestWithJwtPayload } from '../domain/JwtPayload';

@Injectable()
export class AllowedAccountTypesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<AccountType>('accountTypes', context.getHandler());

    const req = context.switchToHttp().getRequest() as RequestWithJwtPayload;

    return roles.includes(req.jwtPayload.accountType);
  }
}
