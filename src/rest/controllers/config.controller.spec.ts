import {chai, expect} from '../../testing';
import {appIocFactory} from '../app-ioc';
import {App} from '../app';
import {ConfigGet, CONFIG_GET} from '../../interactors/index';
import { ConfigModel } from '../../models/config.model';

class ConfigGetStub implements ConfigGet {
  async process(): Promise<ConfigModel> {
    return <any>{
      domain: 'www',
      facebook_app_id: '123456',
      facebook_scope: ['email']
    };
  }
}

describe('ConfigController', () => {
  let agent: any;

  const ioc = appIocFactory();
  before(() => {
    ioc.bind(CONFIG_GET).toConstantValue(new ConfigGetStub());
    const app: App = ioc.get(App);
    agent = chai.request.agent(app.create());
  });

  after(() => {
    agent.app.close();
  });

  describe(`GET /api/v2/config`, () => {
    it('should return app config', () => {
      return agent.get('/api/v2/config').then(
        (res: any) => {
          expect(res).to.have.status(200);
          expect(res).to.have.property('body');
          expect(res.body).to.have.all.keys(['domain', 'facebook_app_id', 'facebook_scope']);
        },
        (res: any) => {
          expect(res).to.not.exist;
        }
      );
    });
  });
});
