import {chai, expect} from '../../testing';
import {App} from '../app';
import {AuthLoginByFbRequest, AuthLoginByFb, AUTH_LOGIN_BY_FB, AuthLoginByFbResponse, MeGet, MeGetResponse} from '../../interactors/index';
import { appIocFactory } from '../app-ioc';
import { ME_GET } from '../../interactors/me/me-get';

class AuthLoginByFbStub implements AuthLoginByFb {
  async process(req: AuthLoginByFbRequest): Promise<AuthLoginByFbResponse> {
    const me = req.accessToken;
    return <any>{
      me
    };
  }
}
class MeGetStub implements MeGet {
  async process(): Promise<MeGetResponse> {
    const me = 'you got me';
    return <any>{
      me
    };
  }
}

describe('AuthController', () => {
  let agent: ChaiHttp.Agent;
  const ioc = appIocFactory();
  before(() => {
    ioc.bind(AUTH_LOGIN_BY_FB).toConstantValue(new AuthLoginByFbStub());
    ioc.bind(ME_GET).toConstantValue(new MeGetStub());
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
          expect(res.body.me).to.equal('you got me');
        },
        (res: any) => {
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
            expect(res.body.me).to.equal(req.accessToken);
          },
          (res: any) => {
            expect(res).to.have.status(200);
            expect(res).to.not.exist;
          }
        );
    });
  });
});
