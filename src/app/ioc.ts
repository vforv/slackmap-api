import 'reflect-metadata';
import { Container } from 'inversify';
import { ConfigController } from '../controllers';
import { interfaces } from 'inversify';

export class AppContainer extends Container {
  setup() {
    // controllers
    this.bind(ConfigController).toSelf();
  }
}

const options: interfaces.ContainerOptions = { defaultScope: 'Singleton' };
const iocContainer = new AppContainer(options);
export { iocContainer, iocContainer as ioc };
