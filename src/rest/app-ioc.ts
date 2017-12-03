import {App} from './app';
import {ContainerModule} from 'inversify';
import * as ctrls from './controllers';
import {Config} from '../config/index';

export const appIoc = new ContainerModule(bind => {
  // config
  bind(Config).toSelf();

  // app
  bind(App).toSelf();

  // controllers
  bind(ctrls.ConfigController).toSelf();
  bind(ctrls.AuthController).toSelf();
});
