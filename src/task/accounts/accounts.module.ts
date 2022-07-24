import { Module } from '@nestjs/common';
import { AccountRepositoryModule } from './infrastructure/AccountRepository.module';
import { JwtServiceModule } from '../shared/services/jwt/JwtService.module';
import { AccountRegistrationController } from '../../api/v1/users/AccountRegistrationController';
import { AccountRegistrar } from './use-cases/AccountRegistrar';
import { UserAuthenticator } from './use-cases/UserAuthenticator';
import { UserLoginController } from '../../api/v1/users/UserLoginController';
import { ValidationShowController } from '../../api/v1/users/ValidationShowController';

@Module({
  imports: [AccountRepositoryModule, JwtServiceModule],
  controllers: [AccountRegistrationController, UserLoginController, ValidationShowController],
  providers: [AccountRegistrar, UserAuthenticator],
})
export class AccountsModule {}
