import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {Todo, TodoSchema} from "./schema/todo.schema";
import {UserModule} from "../user/user.module";
import {TodoServices} from "./todo.services";
import {TodoController} from "./todo.controller";


@Module({
    imports: [MongooseModule.forFeature([{name: Todo.name, schema: TodoSchema}]), UserModule],
    providers: [TodoServices],
    controllers: [TodoController]
})
export class TodoModule{}
