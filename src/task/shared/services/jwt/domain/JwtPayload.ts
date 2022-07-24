import { AccountType } from '../../../../accounts/domain/AccountType';

export type JwtPayload = {
  sub: string;
  accountType: AccountType;
};

export type RequestWithJwt<T> = {
  jwtPayload: T;
};

export type RequestWithJwtPayload = RequestWithJwt<JwtPayload>;
