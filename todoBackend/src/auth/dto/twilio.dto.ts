import {IsNotEmpty} from "class-validator";

export class TwilioDto {

    @IsNotEmpty()
    email : string;

    @IsNotEmpty()
    phone : string

}