import 'reflect-metadata';
import {Container} from 'inversify';

export function iocFactory(): Container {
  const ioc = new Container();
  ioc.bind(Container).toConstantValue(ioc);
  return ioc;
}
