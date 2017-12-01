import * as chaiLib from 'chai';
export const expect = chaiLib.expect;
export const chai = chaiLib;
export {iocFactory} from './ioc';

const chaiHttp = require('chai-http');
chaiLib.use(chaiHttp);
