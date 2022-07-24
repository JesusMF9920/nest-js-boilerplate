import { Uuid } from '../../../domain/Uuid';
import { AccountType } from '../../../../accounts/domain/AccountType';
import { AccessToken } from './tokens/AccessToken';
import { JwtPayload } from './JwtPayload';

export const JWT_SERVICE_TOKEN = 'JWT_SERVICE_TOKEN';

export interface JwtService {
  sign(uuid: Uuid, accountType: AccountType): Promise<AccessToken>;
  verify(jwt: AccessToken): Promise<boolean>;
  decode(jwt: AccessToken): Promise<JwtPayload>;
}
