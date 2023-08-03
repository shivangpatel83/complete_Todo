import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import mongoose, {Document} from 'mongoose';
import {User} from "../../user/Schema/user";

export type TodoDocument = Todo & Document

@Schema()
export class Todo{

    @Prop()
    task : string;

    @Prop()
    time : string;

    @Prop()
    completed: boolean;

    @Prop()
    edit : boolean

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "User"})
    user : User;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
