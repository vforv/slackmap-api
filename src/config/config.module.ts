import {Module, Global, DynamicModule} from '@nestjs/common';
import {NODE_ENV, LOCAL_CONFIG_PATH, Env} from './configs';
import * as configs from './configs';
import {configOptionsFactory} from './config-options.factory';

/**
 * Just add new config here
 * If you will keep the naming convention, all the rest will be fine
 */
const providers = [configs.FacebookConfig, configs.AppConfig, configs.PhotosConfig, configs.StorageConfig, configs.SessionConfig];

/**
 * This wil automaticly create options for all configs
 */
const optionsProviders = providers.map(ConfigClass => {
  return {
    provide: configs[ConfigClass.name + 'Options'],
    useFactory: (nodeEnv, localConfigPath) => {
      return configOptionsFactory(configs[ConfigClass.name + 'Options'], nodeEnv, localConfigPath);
    },
    inject: [NODE_ENV, LOCAL_CONFIG_PATH]
  };
});

/**
 * this is for testing
 */
const envVariables = [
  {
    provide: NODE_ENV,
    useValue: process.env.NODE_ENV || Env.PROD
  },
  {
    provide: LOCAL_CONFIG_PATH,
    useValue: process.env.LOCAL_CONFIG_PATH || true
  }
];

@Global()
@Module({
  components: [...envVariables, ...optionsProviders, ...providers],
  exports: providers
})
export class ConfigModule {}
