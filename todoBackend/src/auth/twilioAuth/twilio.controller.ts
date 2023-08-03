import {Body, Controller, Post} from "@nestjs/common";
import {TwilioDto} from "../dto/twilio.dto";
import {TwilioServices} from "./twilio.services";
import {TwilioOtpDto} from "../dto/twilio.otp.dto";

@Controller('verify')
export class TwilioController{
    constructor(private twilioServices: TwilioServices) {
    }

    @Post("/sent")
    async verifyUser(@Body() twilioDto : TwilioDto): Promise<any>{
       return await this.twilioServices.sendOtp(twilioDto)

    }

    @Post("/match")
    async verifyOtp(@Body() twilioOtpDto : TwilioOtpDto): Promise<any>{
        return await this.twilioServices.verifyOtp(twilioOtpDto)

    }

}