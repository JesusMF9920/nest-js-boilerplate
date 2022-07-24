import { Module } from '@nestjs/common';
import { AccountRepositoryModule } from './infrastructure/AccountRepository.module';
import { JwtServiceModule } from '../shared/services/jwt/JwtService.module';
import { AccountRegistrationController } from '../../api/v1/users/AccountRegistrationController';
import { AccountRegistrar } from './use-cases/AccountRegistrar';

@Module({
  imports: [AccountRepositoryModule, JwtServiceModule],
  controllers: [AccountRegistrationController],
  providers: [AccountRegistrar],
})
export class AccountsModule {}
