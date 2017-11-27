import { App } from './app/app';
import * as chaiLib from 'chai';
const chaiHttp = require('chai-http');
chaiLib.use(chaiHttp);
const appInst = new App();
export const app = appInst.app;
export const expect = chaiLib.expect;
export const chai = chaiLib;
