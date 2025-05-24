import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000', // o '*' si querés permitir todos los orígenes (no recomendado en producción)
    credentials: true, // si estás usando cookies o headers con auth
  });

  await app.listen(process.env.PORT ?? 3010);
}
bootstrap();
