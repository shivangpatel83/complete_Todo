import {Body, Controller, Post, Req, UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {User} from "../user/Schema/user";
import {AuthServices} from "./auth.services";


@Controller('login')
export class AuthController{

    constructor( private authServices : AuthServices) {
    }
    @Post()
    @UseGuards(AuthGuard('local'))
    async login(@Req() req):Promise<any>{
        const user : User = req.user
        return await this.authServices.login(user)
    }
}

