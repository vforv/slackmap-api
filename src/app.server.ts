import {INestApplication} from '@nestjs/common';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import {ApiExceptionFilter} from '@slackmap/api';

export async function configure(app: INestApplication) {
  app.setGlobalPrefix('/api/v2');

  const options = new DocumentBuilder()
    .setTitle('SlackMap API')
    .setDescription('SlackMap REST API')
    .setVersion('1.0')
    .addTag('slackmap')
    .setBasePath('/api/v2')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api/v2/docs', app, document);

  const apiExceptionFilter = app.get<ApiExceptionFilter>(ApiExceptionFilter);
  app.useGlobalFilters(apiExceptionFilter);
  app.useGlobalFilters(new ApiExceptionFilter());

  await app.init();

  return app;
}
