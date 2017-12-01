import {MeModel} from '../../models/me.model';

export interface MeGetInteractor {
  process(): Promise<MeGetResponse>;
}

export interface MeGetResponse {
  me: MeModel;
}
