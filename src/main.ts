import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ThrottlerExceptionFilter } from './core/infrastructure/filters/throttler-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new ThrottlerExceptionFilter());

  app.enableCors({
    origin: '*', // o '*' si querés permitir todos los orígenes (no recomendado en producción)
    credentials: true, // si estás usando cookies o headers con auth
  });

  app.setGlobalPrefix(process.env.PRE_FIX!);

  await app.listen(process.env.PORT!);
}
bootstrap();
