import {Body, Controller, Delete, Get, Param, Post, Put} from "@nestjs/common";
import {UserServices} from "./user.services";
import {CreateUserDto} from "./userDTO/create-user.dto";
import {ForgetPasswordDto} from "./userDTO/forget.password.dto";

@Controller('user')
export class UserController{
    constructor(private readonly userServices : UserServices) {
    }

    @Post('/signup')
    createUser(@Body() createUserDto: CreateUserDto){
        return this.userServices.createUser(createUserDto)
    }

    @Get()
    findAll(){
        return this.userServices.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: string){
        return this.userServices.findById(id);
    }

    @Put('/forget-password')
    forgetPassword( @Body() forgetPasswordDto: ForgetPasswordDto){
            return this.userServices.forgetPassword(forgetPasswordDto);
    }

    @Delete(':id')
    deleteById(@Param('id') id:string){
        this.userServices.deleteById(id);
    }

    @Delete()
    deleteAll(){
        return this.userServices.deleteAll()
    }

}