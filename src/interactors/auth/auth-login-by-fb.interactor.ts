import {MeModel} from '../../models/me.model';

export interface AuthLoginByFbInteractor {
  process(request: AuthLoginByFbRequest): Promise<AuthLoginByFbResponse>;
}

export interface AuthLoginByFbRequest {
  accessToken: string;
  signedRequest: string;
}

export interface AuthLoginByFbResponse {
  me: MeModel;
}
