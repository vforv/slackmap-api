import {expect, Test} from '@slackmap/testing';
import {DataMockModule} from '@slackmap/data-mock';
import {AuthConnectFacebookUseCase} from './auth-connect-facebook.usecase';
import {FacebookGateway, UserGateway} from '@slackmap/data';
import {FacebookFixture} from '@slackmap/data-fixtures';
import {FacebookProfileModel} from '@slackmap/domain';
import {AuthConnectFacebookResponseDto} from '../../dto';

describe('auth-connect-facebook UseCase', () => {
  let usecase: AuthConnectFacebookUseCase, fb: FacebookGateway;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [DataMockModule],
      components: [AuthConnectFacebookUseCase]
    }).compile();

    usecase = module.get(AuthConnectFacebookUseCase);
    fb = <any>module.get(FacebookGateway);
  });

  it('should return fb profile', () => {
    return usecase
      .process({
        accessToken: FacebookFixture.VALID_PROFILE_TOKEN,
        signedRequest: ''
      })
      .then(
        (res: AuthConnectFacebookResponseDto) => {
          expect(res).to.have.keys('facebookProfile', 'users');
          // expect(res.me.rid).to.equal('u0test');
        },
        err => {
          expect(err).to.not.exist;
        }
      );
  });
  it('should throw error: profile id is required', async () => {
    return usecase
      .process({
        accessToken: FacebookFixture.INVALID_PROFILE_TOKEN,
        signedRequest: ''
      })
      .then(
        (res: AuthConnectFacebookResponseDto) => {
          expect(res).to.not.exist;
        },
        err => {
          expect(err.name).to.equal('ValidationError');
          expect(err.title).to.contains('get id of your facebook profile');
        }
      );
  });
  it('should throw error: profile not found', () => {
    return usecase
      .process({
        accessToken: FacebookFixture.INVALID_TOKEN,
        signedRequest: ''
      })
      .then(
        (res: AuthConnectFacebookResponseDto) => {
          expect(res).to.not.exist;
        },
        err => {
          expect(err.name).to.equal('ValidationError');
          expect(err.title).to.contains('Facebook token invalid');
        }
      );
  });
  it('should return facebook profile + user', () => {
    return usecase
      .process({
        accessToken: FacebookFixture.USER_PROFILE_TOKEN,
        signedRequest: ''
      })
      .then(
        (res: AuthConnectFacebookResponseDto) => {
          expect(res).to.have.keys('facebookProfile', 'users');
          expect(res.users).to.have.length(1);
        },
        err => {
          expect(err).to.not.exist;
        }
      );
  });
});
