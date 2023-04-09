import {DataSource, Repository} from "typeorm";
import {User} from "./user.entity";
import {AuthCredentialsDto} from "./dto/auth-credentials.dto";
import {ConflictException, Injectable, InternalServerErrorException} from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersRepository extends Repository<User>{
    constructor(private dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void>{
        const {username, password} = authCredentialsDto;

        const salt = await bcrypt.genSalt(); //generate a salt
        const hashedPassword = await bcrypt.hash(password, salt); //hash the password

        const user = this.create({username, password:hashedPassword});

        try {
            await this.save(user); //save the user into the database
        }
        catch (e) {
            if (e.code === '23505') { //23505 is the code for duplicate username
                throw new ConflictException('Username already exists');
            }
            else {
                throw new InternalServerErrorException();
            }
        }
    }
}