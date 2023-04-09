import {createParamDecorator, ExecutionContext} from "@nestjs/common";
import {User} from "./user.entity";

export const GetUser = createParamDecorator((data, ctx:ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
});

//This is a code snippet that defines a custom decorator in a NestJS application. The decorator is called GetUser and is used to extract the authenticated user from the request object.

// Here's a breakdown of the code:
//
// Import statements: The createParamDecorator and ExecutionContext classes are imported from the @nestjs/common module, while the User entity is imported from a local user.entity file.
//
// GetUser decorator: This is created using the createParamDecorator function. This function takes a callback function that extracts the desired parameter from the request object and returns it. In this case, the callback function takes two parameters: data (which is not used in this case), and ctx which is an ExecutionContext object representing the current execution context of the application.
//
// switchToHttp().getRequest(): This line extracts the request object from the ExecutionContext object. The switchToHttp() method returns an HttpServer object, which represents the underlying HTTP server used by the NestJS application. The getRequest() method is then called on this object to get the current request object.
//
// req.user: This line returns the user property of the request object, which is assumed to contain the authenticated user object. The user property is typically set by an authentication middleware or strategy earlier in the request lifecycle.
//
// The User entity returned by the decorator is then used by other parts of the application to perform authorization or other user-specific tasks.