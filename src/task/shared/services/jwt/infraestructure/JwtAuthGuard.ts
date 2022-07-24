import {
  applyDecorators,
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  SetMetadata,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JWT_SERVICE_TOKEN, JwtService } from '../domain/JwtService';
import { Request } from 'express';
import { AccessToken } from '../domain/tokens/AccessToken';
import { AccountType } from '../../../../accounts/domain/AccountType';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AllowedAccountTypesGuard } from './AllowedAccountTypes';

@Injectable()
class JwtAuthGuard implements CanActivate {
  constructor(@Inject(JWT_SERVICE_TOKEN) private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const authorizationHeader = request.headers.authorization;

    if (!authorizationHeader) {
      throw new UnauthorizedException('Missing auth header');
    }

    const matches = authorizationHeader.match(/Bearer (.+)/);
    if (!matches) {
      throw new UnauthorizedException('Malformed auth header');
    }

    const accessToken = new AccessToken(matches[1]);

    await this.jwtService.verify(accessToken);
    const jwtPayload = await this.jwtService.decode(accessToken);
    request.jwtPayload = jwtPayload;
    return true;
  }
}

export function GuardWithJwt(accountTypes: AccountType[]) {
  return applyDecorators(
    ApiBearerAuth('access-token'),
    UseGuards(JwtAuthGuard),
    SetMetadata('accountTypes', accountTypes),
    UseGuards(AllowedAccountTypesGuard),
  );
}
