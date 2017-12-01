import {chai, expect, mockIocFactory} from './ctrl-testing';
import {App} from '../app';

const ioc = mockIocFactory();

describe('ConfigController', () => {
  let agent: any;
  before(() => {
    const app: App = ioc.get(App);
    agent = chai.request.agent(app.create());
  });

  after(() => {
    agent.app.close();
  });

  describe(`GET /api/v2/config`, () => {
    it('should return app config', async () => {
      expect(true).to.be.true;
      const res = await agent.get('/api/v2/config');

      expect(res).to.have.status(200);
      expect(res).to.have.property('body');
      expect(res.body).to.have.all.keys(['domain', 'facebook_app_id', 'facebook_scope']);
    });
  });

  // describe(`POST /api/v2/config`, () => {
  //   it('should have validation error', async () => {
  //     await agent.post('/api/v2/config').then(
  //       res => {
  //         expect(res).to.not.exist;
  //       },
  //       res => {
  //         expect(res).to.have.status(400);
  //         expect(res.response.body)
  //           .to.have.property('name')
  //           .and.to.equal('ValidateError');
  //         expect(res.response.body).to.have.property('fields');
  //         expect(res.response.body).to.have.any.keys(
  //           'fields',
  //           'message',
  //           'name'
  //         );
  //       }
  //     );
  //   });
  // });
});
