import {expect} from '@slackmap/testing';
import {Env} from './index';
import {configOptionsFactory} from './config-options.factory';
import {AppConfigOptions} from './configs';

describe('ConfigOptions Factory', () => {
  const keys = ['env', 'host'];

  it('should throw "NODE_ENV has to be set"', () => {
    expect(() => configOptionsFactory(AppConfigOptions, <any>'', false)).to.throw('NODE_ENV has to be set');
  });

  it('should throw "unknown config env"', () => {
    expect(() => configOptionsFactory(AppConfigOptions, <any>'unknown', false)).to.throw('NODE_ENV value "UNKNOWN" is unknown');
  });

  it('should load DEV config options', () => {
    const options = configOptionsFactory(AppConfigOptions, Env.DEV, true);
    expect(options).to.contains.keys(keys);
    expect(options.env).to.equal(Env.DEV);
  });

  it('should load PROD config options', () => {
    const options = configOptionsFactory(AppConfigOptions, Env.PROD, true);
    expect(options).to.contains.keys(keys);
    expect(options.env).to.equal(Env.PROD);
  });

  it('should load TEST config options', () => {
    const options = configOptionsFactory(AppConfigOptions, Env.TEST, true);
    expect(options).to.contains.keys(keys);
    expect(options.env).to.equal(Env.TEST);
  });

  it('should load TESTRUN config options', () => {
    const options = configOptionsFactory(AppConfigOptions, Env.TESTRUN, true);
    expect(options).to.contains.keys(keys);
    expect(options.env).to.equal(Env.TESTRUN);
  });
});
