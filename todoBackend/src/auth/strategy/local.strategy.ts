import {PassportStrategy} from "@nestjs/passport";
import {Strategy} from "passport-local";
import {Injectable, UnauthorizedException} from "@nestjs/common";
import {UserServices} from "../../user/user.services";
import {User} from "../../user/Schema/user";
import * as bcrypt from "bcrypt";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private readonly userServices : UserServices) {
        super(
            {
                usernameField : 'email',
                passwordField : 'password'
            }
        );
    }
    async validate(email: string, password : string): Promise<any >{
        const user : User = await this.userServices.findByMail(email);

            if(!user){
                throw new UnauthorizedException('User not Found : ' + email);
            }

            const match = await bcrypt.compare(password, user.password)
            if(!match){
                throw new UnauthorizedException('Invalid Password.');
            }
            if(match){
                return user
            }
    }
}