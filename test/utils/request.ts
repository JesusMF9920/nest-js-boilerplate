import { RequestMethod } from '@nestjs/common';
import { Server } from 'http';
import * as supertestRequest from 'supertest';
import { Response, SuperTest, Test } from 'supertest';

export class TestExpectationExecutor {
  constructor(private app: Server, private url: string, private method: RequestMethod) {}

  private body?: any;
  private jwt?: string;

  private expectedStatus?: number;
  private expectedBody: any;

  send(body: any) {
    this.body = body;
    return this;
  }

  authWithBearer(jwt: string) {
    this.jwt = jwt;
    return this;
  }

  expect(number: number) {
    this.expectedStatus = number;
    return this;
  }

  expectBody(body: any) {
    this.expectedBody = body;
    return this;
  }

  async run() {
    let requestChain = this.getRequestChain(supertestRequest(this.app));

    requestChain = this.setupRequest(requestChain);

    const response = await requestChain;
    this.executeExpectations(response);
    return response;
  }

  private executeExpectations(response: Response) {
    try {
      if (this.expectedStatus) {
        expect(response.status).toEqual(this.expectedStatus);
      }
      if (this.expectedBody) {
        expect(response.body).toEqual(this.expectedBody);
      }
    } catch (error: any) {
      error.stack = error.stack.replace(/.*TestExpectationExecutor.executeExpectations.*\n/, '');
      error.stack = error.stack.replace(/.*TestExpectationExecutor.run.*\n/, '');
      error.stack = error.stack.replace(/.*processTicksAndRejections.*\n/, '');

      console.error(response.body);

      throw error;
    }
  }

  private setupRequest(chain: Test) {
    if (this.body) {
      chain = chain.send(this.body);
    }

    if (this.jwt) {
      chain = chain.auth(this.jwt, { type: 'bearer' });
    }

    return chain;
  }

  private getRequestChain(chain: SuperTest<Test>): Test {
    return this.method === RequestMethod.POST ? chain.post(this.url) : chain.get(this.url);
  }

  /**
   * keep this method to add a compile-time error if awaiting but not launching .run()
   */
  then() {
    throw new Error("You must call the 'run' method first");
  }
}

export class TestClient {
  constructor(private app: Server) {}

  post(url: string) {
    return new TestExpectationExecutor(this.app, url, RequestMethod.POST);
  }

  get(url: string) {
    return new TestExpectationExecutor(this.app, url, RequestMethod.GET);
  }
}

export function request(app: Server) {
  return new TestClient(app);
}
