import { ConfigModel } from '../models/config.model';
export interface ConfigGetOperation {
    exec(req: ConfigGetRequest): ConfigGetResponse;
}
export interface ConfigGetRequest {
    config: ConfigModel;
}
export interface ConfigGetResponse {
    config: ConfigModel;
}
