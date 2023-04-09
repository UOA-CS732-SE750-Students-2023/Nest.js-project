import {
    NestInterceptor,
    ExecutionContext,
    Injectable,
    CallHandler,
} from '@nestjs/common';
import { classToPlain } from 'class-transformer';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor { //
    intercept(context: ExecutionContext, next: CallHandler<any>) {
        return next.handle().pipe(map(data => classToPlain(data)));
    }
}

//This code defines a NestJS interceptor called TransformInterceptor. An interceptor is a class that is used to implement custom processing of incoming requests and outgoing responses within a NestJS application. Interceptors can be used for various purposes such as logging, caching, or transforming the data.
//
// Let's break down the code:
//
// Import statements: Necessary classes and functions are imported from the respective libraries.
//
// NestInterceptor, ExecutionContext, Injectable, and CallHandler are imported from '@nestjs/common'.
// classToPlain is imported from 'class-transformer'.
// map is imported from 'rxjs/operators'.
// @Injectable(): This is a decorator that makes the class injectable. It means that the NestJS dependency injection system can create instances of this class and inject it into other classes as needed.
//
// TransformInterceptor class: The class implements the NestInterceptor interface, which means it should have an intercept() method.
//
// intercept() method: This method is responsible for handling the interception logic. It takes two parameters:
//
// context: ExecutionContext object that represents the current execution context of the application.
// next: CallHandler object that is used to manage the flow of the request/response.
// next.handle(): This method is called to allow the request to continue processing. In this case, it's followed by the .pipe() method to apply a transformation to the data.
//
// .pipe(map(data => classToPlain(data))): The pipe method takes the map operator from 'rxjs/operators' as an argument. The map operator is used to transform the data returned by the request handling process. The classToPlain function from 'class-transformer' is used to transform the data from a class instance to a plain object, removing any decorators or other metadata attached to the class instance. This can be useful, for example, when sending data to the client in a serialized form.