import 'reflect-metadata';
import './config/slackmap';
import {Container} from 'inversify';

export function iocFactory(): Container {
  const ioc = new Container();
  ioc.bind(Container).toConstantValue(ioc);
  return ioc;
}
