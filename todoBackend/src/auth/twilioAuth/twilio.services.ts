import {Injectable, UnauthorizedException} from "@nestjs/common";
import {UserServices} from "../../user/user.services";
import {ConfigService} from "@nestjs/config";
import {TwilioOtpDto} from "../dto/twilio.otp.dto";
import {AuthServices} from "../auth.services";


@Injectable()
export class TwilioServices{
    constructor(private userServices : UserServices, private configService: ConfigService, private authServices: AuthServices) {

    }

    async sendOtp(data): Promise<any>{
        const user = await this.userServices.findByMail(data.email)
        // console.log(user)
        if(!user){
            throw new UnauthorizedException("Invalid Email")
        }
        else if(user.phoneNo != data.phone){
            throw new UnauthorizedException("Invalid Phone")
        }
        else if(user && user.phoneNo==data.phone){
            const phone = '+91'+data.phone
            const client = require('twilio')(this.configService.get("TWILIO_AUTH_SID"), this.configService.get("TWILIO_AUTH_TOKEN"))
            // console.log(client)
           const response = await client.verify.v2.services(this.configService.get('TWILIO_SID'))
                .verifications
                .create({ to: phone, channel: 'sms' })

            // console.log(response.sid)
            return {
                sid : response.sid,
                email : user.email
            }
        }

    }

    async verifyOtp(data: TwilioOtpDto,): Promise<any> {
        const {OTP, sid, email} = data;
        const client = require('twilio')(this.configService.get("TWILIO_AUTH_SID"), this.configService.get("TWILIO_AUTH_TOKEN"));
        try {
            const res = await client.verify.v2
                .services(this.configService.get('TWILIO_SID'))
                .verificationChecks.create({
                    verificationSid: sid,
                    code: OTP,
                });
            if (res.status === 'approved') {
                const user = await this.userServices.findByMail(email)
                const token = this.authServices.login(user)

                return {
                    status: 201,
                    message: res.status,
                    Token: token.Token
                };
            }
        } catch (e) {
            return {
                status: 404,
                error: e,
            };
        }
    }
}