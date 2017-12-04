import {App} from './app';
import {ContainerModule, Container} from 'inversify';
import * as ctrls from './controllers';
import {Config} from '../config/index';
import {iocFactory} from '../ioc';

export const appIoc = new ContainerModule(bind => {
  // config
  bind(Config).toSelf();

  // app
  bind(App).toSelf();

  // controllers
  bind(ctrls.ConfigController).toSelf();
  bind(ctrls.AuthController).toSelf();
});

export function appIocFactory(): Container {
  const ioc = iocFactory();

  ioc.load(appIoc);

  return ioc;
}
