import {AuthLoginByFbRequest, AuthLoginByFb, AuthLoginByFbResponse} from '../../../interactors';
import {injectable, inject} from 'inversify';
import { DB_MOCK, DbMock } from '../../db.mock';
import { MeModel } from '../../../models/me.model';
import { DbCollections, FbTokens } from '../../fixtures/db.fixture';

@injectable()
export class AuthLoginByFbMock implements AuthLoginByFb {
  @inject(DB_MOCK)
  private db: DbMock;
  async process(request: AuthLoginByFbRequest): Promise<AuthLoginByFbResponse> {
    const token: FbTokens = this.db.get(DbCollections.FB_TOKENS).find({token: request.accessToken}).value();
    const me: MeModel = this.db.get(DbCollections.USERS).find({facebook_id: token.profile.id}).value();
    return Promise.resolve({
      me: me
    });
  }
}
