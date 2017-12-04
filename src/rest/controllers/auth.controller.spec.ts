import {chai, expect, mockIocFactory} from './ctrl-testing';
import {App} from '../app';
import {AuthLoginByFbRequest} from '../../interactors/index';

const ioc = mockIocFactory();

describe('AuthController', () => {
  let agent: ChaiHttp.Agent;
  before(() => {
    const app: App = ioc.get(App);
    agent = chai.request.agent(app.create());
  });

  after(() => {
    agent.app.close();
  });

  describe(`GET /api/v2/auth/me`, () => {
    it('should return current user session', async () => {
      return agent.get('/api/v2/auth/me').then(
        (res: any) => {
          expect(res).to.have.status(200);
          expect(res).to.have.property('body');
          expect(res.body).to.have.all.keys(['me']);
        },
        (res: any) => {
          console.log(res.response.body.stack);
          expect(res).to.not.exist;
        }
      );
    });
  });

  describe(`POST /api/v2/auth/loginByFb`, () => {
    it('should have validation error', async () => {
      const req: AuthLoginByFbRequest = {
        accessToken: 'fb-mock-token',
        signedRequest: 'test-sign'
      };

      await agent
        .post('/api/v2/auth/loginByFb')
        .send(req)
        .then(
          (res: any) => {
            expect(res).to.have.status(200);
            expect(res).to.have.property('body');
            expect(res.body).to.have.all.keys(['me']);
          },
          (res: any) => {
            expect(res).to.have.status(200);
            expect(res).to.not.exist;
          }
        );
    });
  });
});
