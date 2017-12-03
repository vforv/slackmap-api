import {MeModel} from '../../models/me.model';

export const AUTH_LOGIN_BY_FB = Symbol('AuthLoginByFacebook Interactor');

export interface AuthLoginByFb {
  process(request: AuthLoginByFbRequest): Promise<AuthLoginByFbResponse>;
}

export interface AuthLoginByFbRequest {
  accessToken: string;
  signedRequest: string;
}

export interface AuthLoginByFbResponse {
  me: MeModel;
}
