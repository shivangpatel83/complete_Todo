import {BadRequestException, ForbiddenException, HttpStatus, Injectable, UnauthorizedException} from "@nestjs/common";
import {CreateUserDto} from "./userDTO/create-user.dto";
import { Model} from "mongoose";
import {User, UserDocument} from "./Schema/user";
import {InjectModel} from "@nestjs/mongoose";
import {ForgetPasswordDto} from "./userDTO/forget.password.dto";
import * as bcrypt  from "bcrypt";

@Injectable()
export class UserServices{

    constructor(@InjectModel(User.name) private readonly userModel : Model<UserDocument>) {
    }

    async findByMail(email : string) : Promise<any>{
        return await this.userModel.findOne({email: email}).exec()
    }

    async createUser(createUserDto: CreateUserDto): Promise<any>{

        const IsUser = await this.findByMail(createUserDto.email)
        if(!IsUser) {
            const {firstName, lastName, email, phoneNo, password} =createUserDto
            const hash = await bcrypt.hash(password, 12)
            const saveUser = {
                firstName,
                lastName,
                email,
                phoneNo,
                password: hash
            };
            const user = new this.userModel(saveUser)
            return await user.save();

        }
        else{
          return {
              status: 400,
              error : "Already a User Try to Login!"
          }
        }
    }

    async findAll(): Promise<any>{
        return await this.userModel.find().exec();
    }

    async findById(id:string): Promise<any>{
        const findUser = await this.userModel.findOne({_id : id}).exec();
        return findUser._id
    }


    async forgetPassword( data: ForgetPasswordDto): Promise<any>{
        const {email, password} = data

        const hash = await bcrypt.hash(password,12)
        return await this.userModel.updateOne({email: email},
            {
                password : hash
            }).exec()
    }

    async deleteById(id:string):Promise<any>{
        return await this.userModel.deleteOne({_id:id}).exec()
    }

    async deleteAll(): Promise<any>{
        await this.userModel.deleteMany().exec()
        return 'All Users has been deleted.'
    }
}