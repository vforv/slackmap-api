import {expect} from '@slackmap/testing';
import {Config} from './config';
import {EnvConfig} from './index';

describe('Config', () => {
  const keys = ['env', 'domain', 'storage'];

  it('should throw "NODE_ENV has to be set"', () => {
    expect(() => new Config('', process.env.STORAGE_BASE_DIR)).to.throw('NODE_ENV has to be set');
  });

  it('should throw "unknown config env"', () => {
    expect(() => new Config('unknown', process.env.STORAGE_BASE_DIR)).to.throw('env "UNKNOWN" is not known');
  });

  it('should load dev config', () => {
    const config = new Config(EnvConfig.DEV, process.env.STORAGE_BASE_DIR);
    expect(config).to.contains.keys(keys);
    expect(config.env).to.equal(EnvConfig.DEV);
  });

  it('should load prod config', () => {
    const config = new Config(EnvConfig.PROD, process.env.STORAGE_BASE_DIR);
    expect(config).to.contains.keys(keys);
    expect(config.env).to.equal(EnvConfig.PROD);
  });

  it('should load test config', () => {
    const config = new Config(EnvConfig.TEST, process.env.STORAGE_BASE_DIR);
    expect(config).to.contains.keys(keys);
    expect(config.env).to.equal(EnvConfig.TEST);
  });

  it('should load testrun config', () => {
    const config = new Config(EnvConfig.TESTRUN, process.env.STORAGE_BASE_DIR);
    expect(config).to.contains.keys(keys);
    expect(config.env).to.equal(EnvConfig.TESTRUN);
  });

  it('should load testrun config', () => {
    const config = new Config(EnvConfig.TESTRUN, process.env.STORAGE_BASE_DIR);
    expect(config).to.contains.keys(keys);
    expect(config.env).to.equal(EnvConfig.TESTRUN);
  });
});
