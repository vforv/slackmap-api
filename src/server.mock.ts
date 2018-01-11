import {configure} from './app.server';
import {AppModuleMock} from './app.module.mock';
import {NestFactory} from '@nestjs/core';
import * as express from 'express';

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(AppModuleMock, server);
  await configure(app);
  server.listen(3000);

  process.on('SIGTERM', () => {
    app.close();
    console.log('Graceful shutdown the server');
    process.exit();
  });
}
bootstrap();
