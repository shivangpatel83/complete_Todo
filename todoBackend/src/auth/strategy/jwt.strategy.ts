import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {ConfigService} from "@nestjs/config";
import {Injectable} from "@nestjs/common";

@Injectable( )
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private configService : ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_KEY')
        });
    }

    async validate(payload: any){
        return {
            id : payload.id,
            firstName : payload.firstName,
            lastName : payload.lastName,
            email : payload.email,
        }
    }
}