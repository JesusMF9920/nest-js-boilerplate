import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { MARIA } from '../../src/utils/fixtures/accounts';
import { ClockServiceFake } from '../../src/task/shared/services/clock/infraestructure/ClockFake';
import { UuidGeneratorFixed } from '../../src/task/shared/services/uuid-generator/infraestructure/UuidGeneratorFixed';
import { AccountRepositoryMemory } from '../../src/task/accounts/infrastructure/AccountRepositoryMemory';
import { AppModule } from '../../src/app.module';
import {
  CLOCK_SERVICE_TOKEN,
  ClockService,
} from '../../src/task/shared/services/clock/domain/ClockService';
import {
  UUID_GENERATOR_TOKEN,
  UuidGenerator,
} from '../../src/task/shared/services/uuid-generator/domain/UuidGenerator';
import {
  ACCOUNT_REPOSITORY_TOKEN,
  AccountRepository,
} from '../../src/task/accounts/domain/AccountRepository';
import { Server } from 'http';
import { request } from './request';
import { config } from '../../src/config';

type Dependencies = {
  clock?: ClockService;
  uuidGenerator?: UuidGenerator;
};

type Repositories = {
  accountRepository?: AccountRepository;
};

type AllDependencies = Dependencies & Repositories;

export class TestClient {
  private app!: Server;

  private static apps: INestApplication[] = [];

  private static addAppInstance(app: INestApplication) {
    this.apps.push(app);
  }

  public static async teardownApps() {
    for (const app of this.apps) {
      await app.close();
    }
  }

  async initialize(dependencies: AllDependencies) {
    let testingModuleBuilder = Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(CLOCK_SERVICE_TOKEN)
      .useValue(dependencies.clock)
      .overrideProvider(UUID_GENERATOR_TOKEN)
      .useValue(dependencies.uuidGenerator);

    if (!config.forceEnableMikroORMRepositories) {
      testingModuleBuilder = testingModuleBuilder
        .overrideProvider(ACCOUNT_REPOSITORY_TOKEN)
        .useValue(dependencies.accountRepository);
    }

    const moduleFixture = await testingModuleBuilder.compile();
    const nestApplication: INestApplication = moduleFixture.createNestApplication();
    await nestApplication.init();

    TestClient.addAppInstance(nestApplication);
    this.app = nestApplication.getHttpServer();
  }

  healthz() {
    return request(this.app).get('/meta/healthz');
  }

  simulateError() {
    return request(this.app).get('/meta/simulate-error');
  }

  registerUser({ id = MARIA.id, email = MARIA.email, password = MARIA.password } = {}) {
    return request(this.app).post('/api/v1/auth/account/registration').send({
      id,
      email,
      password,
    });
  }
}

export async function createClient({
  clock = ClockServiceFake.createFixed(),
  uuidGenerator = new UuidGeneratorFixed(),
  accountRepository = new AccountRepositoryMemory(),
}: AllDependencies = {}) {
  const client = new TestClient();

  await client.initialize({
    clock,
    uuidGenerator,
    accountRepository,
  });

  return client;
}
