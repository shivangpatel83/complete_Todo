import {IsNotEmpty} from "class-validator";

export class TwilioOtpDto{

    @IsNotEmpty()
    OTP : string;

    sid : string;

    email : string;

}