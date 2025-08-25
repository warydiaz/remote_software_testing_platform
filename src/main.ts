/* eslint-disable @typescript-eslint/no-unsafe-call */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ThrottlerExceptionFilter } from './core/infrastructure/filters/throttler-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new ThrottlerExceptionFilter());

  app.enableCors({
    origin: [
      'https://nextest.santitorrabadella.com/',
      'http://localhost:8080/',
    ],
    credentials: true,
  });

  app.setGlobalPrefix(process.env.PRE_FIX!);

  await app.listen(process.env.PORT!);
}
bootstrap();
