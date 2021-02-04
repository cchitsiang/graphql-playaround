import * as fs from 'fs';
import { INestApplication, ClassSerializerInterceptor, ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import { AppModule } from './app.module';

function setupSwagger(app: INestApplication) {
  const writeSwaggerJson = (path: string, document) => {
    fs.writeFileSync(`${path}/swagger.json`, JSON.stringify(document, null, 2), { encoding: 'utf8' });
  };

  const options = new DocumentBuilder().setTitle('API').setVersion('1.0').addBearerAuth().build();

  const document = SwaggerModule.createDocument(app, options);
  writeSwaggerJson(`${process.cwd()}`, document);
  SwaggerModule.setup('docs', app, document);
  app.use('/docs/swagger.json', (_, res) => {
    res.json(document);
  });
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    bodyParser: true,
  });
  const port = 4000;
  const apiBasePath = '/api';

  app.use(helmet());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.enableCors({ origin: true, credentials: true });

  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(...[new ClassSerializerInterceptor(reflector)]);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  if (apiBasePath) {
    app.setGlobalPrefix(apiBasePath);
  }

  setupSwagger(app);

  await app.startAllMicroservicesAsync();
  await app.listen(port);

  Logger.log(`GrahpQL Playground available at http://localhost:${port}/graphql`);
  Logger.log(`Swagger UI available at http://localhost:${port}/docs`);
  Logger.log(`Application is running on: http://localhost:${port}${apiBasePath || ''}`);
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
