import {Express} from 'express';
import {Test} from '@nestjs/testing';
import {INestApplication, HttpStatus} from '@nestjs/common';
import * as chaiLib from 'chai';
import {Fixtures} from '../src/data-fixtures';
import {configure} from '../src/app.server';
export const expect = chaiLib.expect;
export const assert = chaiLib.assert;
export const chai = chaiLib;
import * as express from 'express';
import {NestFactory} from '@nestjs/core';
import {AppModuleMock} from '../src/app.module.mock';
const chaiHttp = require('chai-http');
const chaiLike = require('chai-like');
chaiLib.use(chaiHttp);
chaiLib.use(chaiLike);
export const request = chai.request;
export {Test, express, Fixtures, HttpStatus};

export class TestBed {
  static Fixtures = Fixtures;
  static app: TestBed;
  agent: ChaiHttp.Agent;
  app: INestApplication;
  server: Express;
  close: () => Promise<void>;
  static url(path: string): string {
    return '/api/v2/' + path;
  }
  static async createApp(): Promise<TestBed> {
    if (TestBed.app) {
      return TestBed.app;
    }
    const server = express();
    const app = await NestFactory.create(AppModuleMock, server);
    await configure(app);
    const agent = request.agent(server);
    async function close() {
      await agent.app.close();
      await app.close();
    }
    return (TestBed.app = {
      agent,
      app,
      close,
      server
    });
  }
}
