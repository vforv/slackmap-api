import {Container, interfaces} from 'inversify';
import 'reflect-metadata';
import {App} from './app';
import {ConfigController} from './controllers';

export class AppContainer extends Container {
  configure() {
    // controllers
    this.bind(ConfigController).toSelf();
    this.bind(App).toSelf();
  }
}

const options: interfaces.ContainerOptions = {defaultScope: 'Singleton'};
const iocContainer = new AppContainer(options);
export {iocContainer as ioc};
