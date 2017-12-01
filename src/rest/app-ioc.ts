import {App} from './app';
import {ContainerModule} from 'inversify';
import {ConfigController} from './controllers';

export const appIoc = new ContainerModule(bind => {
  // app
  bind(App).toSelf();
  // controllers
  bind(ConfigController).toSelf();
});
