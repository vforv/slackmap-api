import 'reflect-metadata';
import { Container } from 'inversify';
import { ConfigController } from 'controllers/index';
const iocContainer = new Container({ defaultScope: 'Singleton' });

// controllers
iocContainer.bind(ConfigController).toSelf();

export { iocContainer, iocContainer as ioc };
