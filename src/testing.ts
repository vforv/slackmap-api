import * as chaiLib from 'chai';
export const expect = chaiLib.expect;
export const chai = chaiLib;
export {ioc} from './ioc';

const chaiHttp = require('chai-http');
chaiLib.use(chaiHttp);
