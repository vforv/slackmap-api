import * as interactors from '../../../interactors';
import { injectable } from 'inversify';

@injectable()
export class AuthLoginByFbMock implements interactors.AuthLoginByFb {
  async process(request: interactors.AuthLoginByFbRequest): Promise<interactors.AuthLoginByFbResponse> {
    return Promise.resolve({
      me: {
        name: 'my mock name logged int'
      }
    });
  }
}
