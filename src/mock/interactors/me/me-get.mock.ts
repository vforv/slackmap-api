import * as interactors from '../../../interactors';
import { injectable } from 'inversify';

@injectable()
export class MeGetMock implements interactors.MeGet {
  async process(): Promise<interactors.MeGetResponse> {
    return Promise.resolve({
      me: {
        name: 'my mock name from session'
      }
    });
  }
}
