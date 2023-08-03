import {Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthServices{
    constructor(private readonly jwtService: JwtService) {
    }
     login(user){

        const payload = {
            id : user['_id'],
            firstName : user.firstName,
            lastName : user.lastName,
            email : user.email,
        }
        const token : string = this.jwtService.sign(payload)
        return {Token : token}
    }
}