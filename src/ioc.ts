import 'reflect-metadata';
import {Container} from 'inversify';

const ioc = new Container();

ioc.bind(Container).toConstantValue(ioc);

export {ioc};
