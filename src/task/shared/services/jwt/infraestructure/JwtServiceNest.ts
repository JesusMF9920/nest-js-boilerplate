import { JwtService as NestJwtService } from '@nestjs/jwt';
import { JwtSignOptions } from '@nestjs/jwt/dist/interfaces/jwt-module-options.interface';
import { JwtService } from '../domain/JwtService';
import { config } from '../../../../../config';
import { Uuid } from '../../../domain/Uuid';
import { AccountType } from '../../../../accounts/domain/AccountType';
import { AccessToken } from '../domain/tokens/AccessToken';
import { JwtPayload } from '../domain/JwtPayload';

export class JwtServiceNest implements JwtService {
  private static readonly JWT_OPTIONS: JwtSignOptions = {
    expiresIn: '1y',
  };

  private jwtNestService = new NestJwtService({ secret: config.jwt.secret });

  async sign(uuid: Uuid, accountType: AccountType): Promise<AccessToken> {
    const payload: JwtPayload = { accountType, sub: uuid.getValue() };

    const jwt = this.jwtNestService.sign(payload, JwtServiceNest.JWT_OPTIONS);

    return new AccessToken(jwt);
  }

  async verify(jwt: AccessToken): Promise<boolean> {
    const result = await this.jwtNestService.verifyAsync(jwt.getValue());

    return result;
  }

  async decode(jwt: AccessToken): Promise<JwtPayload> {
    return this.jwtNestService.decode(jwt.getValue()) as JwtPayload;
  }
}
