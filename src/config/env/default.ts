import {EnvConfig, AppConfig} from '../config';
import {FacebookConfig, SessionConfig, StorageConfig, PhotosConfig} from '../index';
import {resolve} from 'path';

const facebook: FacebookConfig = {
  app_id: '', // slackmap.loc
  secret: '', // slackmap.loc
  scope: ['email']
};
const session: SessionConfig = {
  key: 'koa.sid', // session cookie name
  cookies: {
    signed: true,
    maxage: 1000 * 60 * 60 * 24 * 100 // 100 days
  }
};
const storage: StorageConfig = {
  base_dir: resolve('../../storage'), // main storage dir
  tmp_dir: 'tmp', // relative to storage dir
  test_dir: 'test', // test dir
  base_url: '/assets/uploads' // test dir
};
const photos: PhotosConfig = {
  base_url: '/assets/uploads/p0',
  private_storage_dir: 'private/media/p0', // relative to storage dir
  public_storage_dir: 'public/uploads/p0', // relative to storage dir
  sizes: {
    xs_s: {
      width: 50,
      height: 50
    },
    s_s: {
      width: 200,
      height: 200
    },
    l: {
      width: 1300,
      height: 960
    }
  }
};

const config: AppConfig = {
  env: EnvConfig.PROD,
  domain: 'https://slackmap.com',
  facebook: facebook,
  session: session,
  storage: storage,
  photos: photos
};

module.exports = config;
