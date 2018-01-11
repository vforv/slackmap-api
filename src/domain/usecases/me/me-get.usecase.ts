import {Component} from '@slackmap/common';
import {MeModel} from '@slackmap/domain';

@Component()
export class MeGetUseCase {
  constructor() {}
  async process(): Promise<MeModel> {
    return {};
  }
}
