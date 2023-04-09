import {Body, Controller, Post, Req, Res, UseGuards} from '@nestjs/common';
import {AuthCredentialsDto} from "./dto/auth-credentials.dto";
import {AuthService} from "./auth.service";
import {AuthGuard} from "@nestjs/passport";
import {Response} from "express";

@Controller('auth')//This decorator is used to define the route
export class AuthController {

    constructor(private authService: AuthService) {
    }

    @Post('/signup') //This decorator is used to define the route, it is a subroute of the route defined in the controller decorator
    signUp( @Body() authCredentialsDto: AuthCredentialsDto, @Res() res: Response): Promise<void>{
        //@Body() is used to get the body of the request and encapsulate it in the AuthCredentialsDto object
        res.status(201).json({message: 'User created'});
        return this.authService.signUp(authCredentialsDto);
    }

    @Post('/signin')
    signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}>{
        //@Body() is used to get the body of the request and encapsulate it in the AuthCredentialsDto object
        return this.authService.signIn(authCredentialsDto);
        // call the function in authService and return the access token
    }

}