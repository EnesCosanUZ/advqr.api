import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
require('dotenv').config();

async function init() {
  const PORT: number = parseInt(process.env.PORT);
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('AdvQR Documentation')
    .setVersion('0.1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);
  
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(PORT || 3000);
  
}
init();
