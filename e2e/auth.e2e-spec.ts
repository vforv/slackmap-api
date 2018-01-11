import {TestBed, Fixtures, expect, HttpStatus} from '@slackmap/e2e';
import {AuthConnectFacebookRequestDto} from '@slackmap/domain';

let app: TestBed;
before(async () => {
  app = await TestBed.createApp();
});

after(async () => {
  await app.close();
});

describe('Auth', () => {
  const authConnectFacebookUrl = TestBed.url('auth/connectFacebook');
  describe(`POST ${authConnectFacebookUrl}`, () => {
    it('should have validation error', done => {
      const req: AuthConnectFacebookRequestDto = {
        accessToken: Fixtures.FacebookFixture.INVALID_PROFILE_TOKEN,
        signedRequest: 'test-sign'
      };

      app.agent
        .post(authConnectFacebookUrl)
        .send(req)
        .end((err: any, res: any) => {
          expect(res).to.be.json;
          expect(res).to.have.status(422);
          expect(res.body, JSON.stringify(res.body, null, 2))
            .to.have.property('name')
            .that.equals('ValidationError');
          expect(res.body).to.have.any.keys('name', 'title', 'statusCode');
          done();
        });
    });
    it('should connect with facebook account', () => {
      const req: AuthConnectFacebookRequestDto = {
        accessToken: Fixtures.FacebookFixture.VALID_PROFILE_TOKEN,
        signedRequest: 'test-sign'
      };

      return app.agent
        .post(authConnectFacebookUrl)
        .send(req)
        .catch(err => err.response)
        .then((res: any) => {
          expect(res).to.be.json;
          expect(res.body, JSON.stringify(res.body, null, 2)).like({
            users: [
              {
                rid: 'u0test',
                facebook_id: '1234567890',
                email: 'test@slackmap.com',
                name: 'Test User',
                first_name: 'Test',
                last_name: 'User'
              }
            ],
            facebookProfile: {
              id: '1234567890'
            }
          });
        });
    });
  });

  const authMeUrl = TestBed.url('auth/me');
  describe(`GET ${authMeUrl}`, () => {
    // it('should return current user session', async () => {
    //   return app.agent
    //     .get(authMeUrl)
    //     .catch(errorHandler)
    //     .then((res: any) => {
    //       expect(res).to.have.status(200);
    //       expect(res).to.have.property('body');
    //       expect(res.body).to.have.all.keys(['me']);
    //       expect(res.body.me).to.equal('you got me');
    //     });
    // });
  });
});
