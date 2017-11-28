import { ConfigModel } from '../../models/config.model';

export interface AuthLoginByFbInteractor {
  process(request: AuthLoginByFbRequest): Promise<AuthLoginByFbResponse>;
}
export interface AuthLoginByFbRequest {
  config: ConfigModel;
}
export interface AuthLoginByFbResponse {
  config: ConfigModel;
}
