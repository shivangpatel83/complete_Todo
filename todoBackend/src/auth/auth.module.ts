import {Module} from "@nestjs/common";
import {AuthController} from "./auth.controller";
import {UserModule} from "../user/user.module";
import {PassportModule} from "@nestjs/passport";
import {LocalStrategy} from "./strategy/local.strategy";
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {JwtStrategy} from "./strategy/jwt.strategy";
import {TwilioController} from "./twilioAuth/twilio.controller";
import {TwilioServices} from "./twilioAuth/twilio.services";
import {AuthServices} from "./auth.services";


@Module({
    imports: [UserModule, PassportModule , JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: ((configService: ConfigService )=> ({
                secret : configService.get('JWT_KEY'),
                signOptions: {
                    expiresIn: configService.get<string>("JWT_EXPIRE")+ 's'
                }
        }))
    })],
    providers:[AuthServices, LocalStrategy, JwtStrategy, TwilioServices],
    controllers:[AuthController, TwilioController]
})
export class AuthModule{}