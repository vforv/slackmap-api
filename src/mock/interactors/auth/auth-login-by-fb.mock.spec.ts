import {mockIocFactory} from '../../mock-ioc';
import {AuthLoginByFbMock} from './auth-login-by-fb.mock';
import {AUTH_LOGIN_BY_FB} from '../../../interactors/index';
import {AuthLoginByFbResponse} from '../../../interactors/auth/auth-login-by-fb';
import {expect} from '../../../testing';

describe('auth-login-by-fb.mock', () => {
  const ioc = mockIocFactory();
  let interactor: AuthLoginByFbMock;
  before(() => {
    interactor = ioc.get(AUTH_LOGIN_BY_FB);
  });
  it('should return fb profile', () => {
    return interactor
      .process({
        accessToken: 'fb-mock-token',
        signedRequest: 'fb-mock-sign'
      })
      .then((res: AuthLoginByFbResponse) => {
        expect(res).to.have.keys('me');
        expect(res.me.rid).to.equal('u0test');
      });
  });
});
