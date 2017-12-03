import {MeModel} from '../../models/me.model';

export const ME_GET = Symbol('MeGet Interactor');

export interface MeGet {
  process(): Promise<MeGetResponse>;
}

export interface MeGetResponse {
  me: MeModel;
}
