import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import {Todo} from "../../todo/schema/todo.schema";


export type UserDocument = User & Document;

@Schema()
export class User{

    @Prop()
    firstName : string;

    @Prop()
    lastName : string;

    @Prop()
    email : string;

    @Prop()
    phoneNo : string;

    @Prop()
    password : string;

   @Prop({types: mongoose.Schema.Types.ObjectId, ref: "Todo"})
    todos : Todo[];
}

export const UserSchema = SchemaFactory.createForClass(User)