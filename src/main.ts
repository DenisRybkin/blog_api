import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder,SwaggerModule,OpenAPIObject} from '@nestjs/swagger';
import {INestApplication} from "@nestjs/common";
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const PORT  = process.env.PORT || 5000;
  const app: INestApplication = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
      .setTitle("blog_api")
      .setDescription("Documentations REST API")
      .setVersion("1.0.0")
      .addTag('Fishhher')
      .build();

  const document = SwaggerModule.createDocument(app,swaggerConfig);
  SwaggerModule.setup('/api/docs',app,document);
  app.use(cookieParser());
  app.setGlobalPrefix('api');
  await app.listen(PORT, () => console.log(PORT));
}
bootstrap();
