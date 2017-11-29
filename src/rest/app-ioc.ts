import {App} from './app';
import {Container} from 'inversify';
import {ConfigController} from './controllers';

export function configure(ioc: Container) {
  // app
  ioc.bind(App).toSelf();
  // controllers
  ioc.bind(ConfigController).toSelf();
}
