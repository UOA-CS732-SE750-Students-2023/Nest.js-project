import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersRepository} from "./users.repository";
import {User} from "./user.entity";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "./jwt.strategy";

@Module({
    imports: [
        PassportModule.register({defaultStrategy: 'jwt'}),
        //PassportModule is used to integrate Passport.js, a popular authentication library, into the NestJS application. The defaultStrategy is set to 'jwt', which means that the JWT strategy will be used for authentication.
        JwtModule.register({ //This module is used to handle JSON Web Tokens (JWT) for user authentication. The register method is called with a configuration object that has the following properties
            secret: 'topSecret51', //A secret key used to sign and verify JWTs
            signOptions: { //This object contains options for JWT signing
                expiresIn: 3600, //this means that generated tokens will expire after 1 hour
            },
        }),
        TypeOrmModule.forFeature([User])
        // this is used to register the User entity with the TypeORM module, allowing it to be injected into other components of the application, such as the UsersRepository
    ],
    providers: [AuthService, UsersRepository, JwtStrategy],
    //This array defines the services that are provided by this module
    //JwtStrategy will validate any token that's coming in, while extract their username and fetch it from the database. Once I find that, I want to extract that user object into every request in every controller
    controllers: [AuthController],
    //This array defines the controllers that are provided by this module
    exports: [JwtStrategy, PassportModule],
    //This array defines the components that are exported by this module. The JwtStrategy and PassportModule components are exported so that they can be used by other modules in the application.
})
export class AuthModule {}
