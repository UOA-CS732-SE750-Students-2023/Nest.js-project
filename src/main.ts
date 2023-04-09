import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";
import {TransformInterceptor} from "./transform.interceptor";



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //This is to create a new nest.js application using root module
  app.useGlobalPipes(new ValidationPipe());
  //whenever nest.js encounter any of those validation decorators, it will know to execute validation @IsNotEmpty
  app.useGlobalInterceptors(new TransformInterceptor());
  //This is to transform the response

  await app.listen(3000);
  //This is to listen to port 3000
}
bootstrap();
