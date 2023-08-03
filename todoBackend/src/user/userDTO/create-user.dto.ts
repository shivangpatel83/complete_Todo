
import {IsEmail, IsNotEmpty, Length, Matches, MaxLength, MinLength} from 'class-validator';
export class CreateUserDto{
    @IsNotEmpty()
    firstName : string;

    @IsNotEmpty()
    lastName : string;

    @IsEmail()
    email : string;

    @IsNotEmpty()
    @Length(10)
    phoneNo : string;

    @MinLength(8)
    @MaxLength(16)
    @IsNotEmpty()
    @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,16}$/ ,
        { message: 'Password must contain at least one uppercase letter, one lowercase letter, one special character and one digit.'})
    password : string;
}