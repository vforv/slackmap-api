import {Test} from '@nestjs/testing';
import {ConfigModule, AppConfig, Env, FacebookConfig, NODE_ENV, LOCAL_CONFIG_PATH, PhotosConfig, StorageConfig, SessionConfig} from '.';
import {TestingModule} from '@nestjs/testing/testing-module';
import {expect} from '@slackmap/testing';
import {resolve} from 'path';

describe('ConfigModule', () => {
  let module: TestingModule;
  const appKeys = ['env', 'host'];
  const facebookKeys = ['app_id', 'secret'];
  const photosKeys = ['base_url', 'sizes'];
  const storageKeys = ['base_dir'];
  const sessionKeys = ['key', 'cookies'];

  describe('load TESTRUN env', () => {
    before(async () => {
      module = await Test.createTestingModule({
        imports: [ConfigModule]
      }).compile();
    });

    it('should return AppConfig', async () => {
      const appConfig = module.select(ConfigModule).get(AppConfig);
      expect(appConfig).to.exist;
      expect(appConfig).to.contains.keys(appKeys);
      expect(appConfig.env).to.equal(Env.TESTRUN);
    });

    it('should return FacebookConfig', async () => {
      const facebookConfig = module.select(ConfigModule).get(FacebookConfig);
      expect(facebookConfig).to.exist;
      expect(facebookConfig).to.contains.keys(facebookKeys);
    });

    it('should return PhotosConfig', async () => {
      const facebookConfig = module.select(ConfigModule).get(PhotosConfig);
      expect(facebookConfig).to.exist;
      expect(facebookConfig).to.contains.keys(photosKeys);
    });

    it('should return StorageConfig', async () => {
      const facebookConfig = module.select(ConfigModule).get(StorageConfig);
      expect(facebookConfig).to.exist;
      expect(facebookConfig).to.contains.keys(storageKeys);
    });

    it('should return SessionConfig', async () => {
      const facebookConfig = module.select(ConfigModule).get(SessionConfig);
      expect(facebookConfig).to.exist;
      expect(facebookConfig).to.contains.keys(sessionKeys);
    });
  });

  describe('load PROD env', () => {
    before(async () => {
      module = await Test.createTestingModule({
        imports: [ConfigModule]
      })
        .overrideComponent(NODE_ENV)
        .useValue(Env.PROD)
        .compile();
    });

    it('should return AppConfig', async () => {
      const appConfig = module.select(ConfigModule).get(AppConfig);
      expect(appConfig).to.exist;
      expect(appConfig).to.contains.keys(appKeys);
      expect(appConfig.env).to.equal(Env.PROD);
    });

    it('should return FacebookConfig', async () => {
      const facebookConfig = module.select(ConfigModule).get(FacebookConfig);
      expect(facebookConfig).to.exist;
      expect(facebookConfig).to.contains.keys(facebookKeys);
    });
  });

  describe('custom LOCAL_CONFIG_PATH', () => {
    before(async () => {
      module = await Test.createTestingModule({
        imports: [ConfigModule]
      })
        .overrideComponent(LOCAL_CONFIG_PATH)
        .useValue(resolve(__dirname, './env/local-fixture'))
        .compile();
    });

    it('should return AppConfig', async () => {
      const appConfig = module.select(ConfigModule).get(AppConfig);
      expect(appConfig).to.exist;
      expect(appConfig).to.contains.keys(appKeys);
      expect(appConfig.env).to.equal(Env.TESTRUN);
    });

    it('should return FacebookConfig', async () => {
      const facebookConfig = module.select(ConfigModule).get(FacebookConfig);
      expect(facebookConfig).to.exist;
      expect(facebookConfig).to.contains.keys(facebookKeys);
      expect(facebookConfig.app_id).to.equal('local-fixture-id-value');
      expect(facebookConfig.secret).to.equal('local-fixture-secret-value');
    });
  });
  describe('FALSE prvided as LOCAL_CONFIG_PATH', () => {
    before(async () => {
      module = await Test.createTestingModule({
        imports: [ConfigModule]
      })
        .overrideComponent(LOCAL_CONFIG_PATH)
        .useValue(false)
        .compile();
    });

    it('should return AppConfig', async () => {
      const appConfig = module.select(ConfigModule).get(AppConfig);
      expect(appConfig).to.exist;
      expect(appConfig).to.contains.keys(appKeys);
      expect(appConfig.env).to.equal(Env.TESTRUN);
    });

    it('should return FacebookConfig', async () => {
      const facebookConfig = module.select(ConfigModule).get(FacebookConfig);
      expect(facebookConfig).to.exist;
      expect(facebookConfig).to.contains.keys(facebookKeys);
      expect(facebookConfig.app_id).to.equal('testrun-id-value');
      expect(facebookConfig.secret).to.equal('testrun-secret-value');
    });
  });
});
