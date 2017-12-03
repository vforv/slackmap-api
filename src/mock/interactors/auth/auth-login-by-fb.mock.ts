import {AuthLoginByFbRequest, AuthLoginByFb, AuthLoginByFbResponse} from '../../../interactors';
import {injectable} from 'inversify';

@injectable()
export class AuthLoginByFbMock implements AuthLoginByFb {
  async process(request: AuthLoginByFbRequest): Promise<AuthLoginByFbResponse> {
    return Promise.resolve({
      me: {
        name: 'my mock name logged int'
      }
    });
  }
}
