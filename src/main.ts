import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*', // or use '*' for all origins (not recommended for production)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Contact Form API')
    .setDescription('API for submitting and managing contact form entries')
    .setVersion('1.0.0')
    .addTag('contact-forms')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  const baseUrl = `http://localhost:${port}`;
  // eslint-disable-next-line no-console
  console.log(`\nAPI running at:    ${baseUrl}`);
  // eslint-disable-next-line no-console
  console.log(`Swagger docs at:   ${baseUrl}/docs\n`);
}
bootstrap();
