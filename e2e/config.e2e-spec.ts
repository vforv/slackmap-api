import {TestBed, expect} from '@slackmap/e2e';

describe('Config', () => {
  let bed: TestBed;

  before(async () => {
    bed = await TestBed.createApp();
  });

  after(async () => {
    await bed.close();
  });

  const configUrl = TestBed.url('config');
  describe(`GET ${configUrl}`, () => {
    it('should return app config', () => {
      return bed.agent
        .get(configUrl)
        .catch(err => err.response)
        .then((res: any) => {
          expect(res, JSON.stringify(res.body, null, 2)).to.have.status(200);
          expect(res).to.have.property('body');
          expect(res.body).to.have.property('config');
          expect(res.body.config).to.have.all.keys(['host', 'facebook_app_id', 'facebook_scope']);
        });
    });
  });
});
