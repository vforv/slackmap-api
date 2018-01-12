import {AppConfigOptions} from './app.config';
import {SessionConfigOptions} from './session.config';
import {FacebookConfigOptions} from './facebook.config';
import {StorageConfigOptions} from './storage.config';
import {PhotosConfigOptions} from './photos.config';

/**
 * Injection Token for environment, for config module
 */
export const NODE_ENV = Symbol('NODE_ENV');

/**
 * Injection Token to specify path to local config file
 */
export const LOCAL_CONFIG_PATH = Symbol('LOCAL_CONFIG_PATH');

/**
 * Interface for all env files
 */
export interface ConfigOptions {
  app: AppConfigOptions;
  session: SessionConfigOptions;
  facebook: FacebookConfigOptions;
  storage: StorageConfigOptions;
  photos: PhotosConfigOptions;
}
