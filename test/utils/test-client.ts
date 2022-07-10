import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import { Server } from 'http';
import { request } from './request';

type Dependencies = {};

type AllDependencies = Dependencies;

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
    const testingModuleBuilder = Test.createTestingModule({
      imports: [AppModule],
    });

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
}

export async function createClient({}: Dependencies = {}) {
  const client = new TestClient();

  await client.initialize({});

  return client;
}
