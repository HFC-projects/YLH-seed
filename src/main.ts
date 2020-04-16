import * as dotenv from 'dotenv';
dotenv.config();
import * as helmet from 'helmet';
import { config } from './config';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { LoggerService } from './core/services/logger.service';
import { LoggerInterceptor } from './core/interceptors/logger.interceptor';
import { HttpExceptionFilter } from './core/filters/exception.filter';

const logger: LoggerService = LoggerService.createLogger('BootstrapApp');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe(config.validation));
  app.useGlobalInterceptors(new LoggerInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(helmet());

  const options = new DocumentBuilder()
    .setTitle(config.app.name)
    .setDescription(config.app.description)
    .setVersion(config.app.version)
    .addTag('general').addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(config.port);
  logger.log(`Server listen on port: ${config.port}`)
}
bootstrap();
