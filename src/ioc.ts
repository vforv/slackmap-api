import 'reflect-metadata';
import './config/slackmap';
import {Container} from 'inversify';

export function iocFactory(): Container {
  const ioc = new Container();
  ioc.bind(Container).toConstantValue(ioc);
  ioc.bind('NODE_ENV').toConstantValue(process.env.NODE_ENV);
  ioc.bind('STORAGE_BASE_DIR').toConstantValue(process.env.STORAGE_BASE_DIR);
  return ioc;
}
