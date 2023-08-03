import {IsNotEmpty, Matches, MaxLength, MinLength} from "class-validator";


export class ForgetPasswordDto{

    @IsNotEmpty()
    email : string;

    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(16)
    @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,16}$/ , { message: 'Password must contain at least one uppercase letter, one lowercase letter, one special character and one digit.'})
    password : string;

}

