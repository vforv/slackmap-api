import {expect} from '../testing';
import {Config} from './config';

describe('config.ts', () => {
  const keys = ['env', 'domain'];

  it('should load default config', () => {
    process.env.NODE_ENV = '';
    const config = new Config();
    expect(config).to.contains.keys(keys);
  });

  it('should load dev config', () => {
    process.env.NODE_ENV = 'dev';
    const config = new Config();
    expect(config).to.contains.keys(keys);
    expect(config.env).to.equal('dev');
  });
});
