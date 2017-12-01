import {App} from './app';
import {ContainerModule} from 'inversify';
import * as ctrls from './controllers';

export const appIoc = new ContainerModule(bind => {
  // app
  bind(App).toSelf();
  // controllers
  bind(ctrls.ConfigController).toSelf();
  bind(ctrls.AuthController).toSelf();
});
