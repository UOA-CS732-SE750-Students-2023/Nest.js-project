import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //This is to create a new nest.js application using root module
  app.useGlobalPipes(new ValidationPipe());
  //whenever nest.js encounter any of those validation decorators, it will know to execute validation @IsNotEmpty
  await app.listen(3000);
}
bootstrap();
