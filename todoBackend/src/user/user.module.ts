import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "./Schema/user";
import {UserServices} from "./user.services";
import {UserController} from "./user.controller";


@Module({
    imports: [MongooseModule.forFeature([{name : User.name, schema: UserSchema}])],
    providers: [UserServices],
    controllers: [UserController],
    exports: [UserServices]
})
export class UserModule{
}