import {Injectable, Res, UnauthorizedException} from '@nestjs/common';
import {UsersRepository} from "./users.repository";
import {AuthCredentialsDto} from "./dto/auth-credentials.dto";
import * as bcript from 'bcrypt';
import {JwtService} from "@nestjs/jwt";
import {JwtPayload} from "./jwt-payload.interface";

@Injectable()
export class AuthService {
    constructor (
        // @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository,
        private jwtService: JwtService, //can be used to sign the jwt token
    ){}

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>{
        return this.usersRepository.createUser(authCredentialsDto);
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
        const {username, password} = authCredentialsDto;
        //Destructure the object authCredentialsDto to get the username and password

        const user = await this.usersRepository.findOne({where:{username}});
        //Find the user in the database through the username

        if (user && await bcript.compare(password, user.password)) {
            //If the user exists and the password is correct
            //bcript.compare() is used to compare the password with the hashed password in the database
            const payload :JwtPayload = {username};
            //The reason why we pass on the username to the JwtPayload object here is because we might want to use this in different places in the future and we want to maintain the shape of it. So we defined a JwtPayload interface and it assures the type safety

            const accessToken:string = this.jwtService.sign(payload);
            //Create the jwt token
            return {accessToken};
            //Return the jwt token
        }else {
            throw new UnauthorizedException('Please check your login credentials');
        }

    }
}
