import {Injectable, UnauthorizedException} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {InjectRepository} from "@nestjs/typeorm";
import {UsersRepository} from "./users.repository";
import {JwtPayload} from "./jwt-payload.interface";
import {User} from "./user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository,
    ) {
        super({
            secretOrKey: 'topSecret51', //provide the secret that was used to sign the JWT token, must be same as the one in auth.module.ts
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            //This tells the passport module to extract the JWT token from the Authorization header of the incoming request. The token is expected to be in the format of Bearer <token>, where <token> is the actual JWT token.
        });
    }

    async validate(payload: JwtPayload) : Promise<User>{

        const {username} = payload;
        const user: User = await this.usersRepository.findOne({where: {username}});

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
        //when we return the user, the passport is going to take that user and inject it into the request object of every single controller
    }
}

// this code defines a JwtStrategy class that is responsible for authenticating users using
// JSON Web Tokens (JWTs). The class extends the PassportStrategy class and uses the Strategy
// class from the passport-jwt module to implement the JWT authentication strategy.
// It validates the JWT token by retrieving the user object from the database using the
// UsersRepository class and returns it if it exists.