import {Component, Inject} from '@slackmap/common';

export enum Env {
  PROD = 'prod',
  DEV = 'dev',
  TEST = 'test',
  TESTRUN = 'testrun'
}

@Component()
export class AppConfigOptions {
  env: Env;
  host: string;
}

@Component()
export class AppConfig {
  env = Env.PROD;
  host = 'https://slackmap.com';

  constructor(@Inject(AppConfigOptions) options: Partial<AppConfigOptions> = {}) {
    Object.assign(this, options);
  }
}
