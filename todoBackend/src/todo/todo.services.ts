import {Injectable} from "@nestjs/common";
import {Model} from "mongoose";
import {Todo, TodoDocument} from "./schema/todo.schema";
import {InjectModel} from "@nestjs/mongoose";
import {CreateTodoDto} from "./todoDto/create-todo.Dto";
import {UserServices} from "../user/user.services";


@Injectable()
export class TodoServices{

    constructor(@InjectModel(Todo.name) private readonly todoModel : Model<TodoDocument>, private readonly userServices: UserServices) {
    }

    async createTodo(createTodoDto : CreateTodoDto, id: string) : Promise<any>{
        const getUserId = await this.userServices.findById(id)
        const addTodo= {
            task : createTodoDto.task,
            time : new Date().getTime(),
            completed: false,
            edit : false,
            user : getUserId
        }
        const todo = new this.todoModel(addTodo)
        return await todo.save()
    }
async getAllTodos(id):Promise<any>{
        return await this.todoModel.find({user:id}).exec()
}
    async findAllIncompleteTodo(id: string){
       return await this.todoModel.find({user: id, completed: false}).exec()
    }

    async findAllCompleteTodo(id: string){
        return await this.todoModel.find({user: id, completed: true}).exec()
    }

    async updateComplete(id: string): Promise<any> {
        return await this.todoModel.updateOne({_id: id}, {completed : true}).exec()
}

async setEditButton(id: string): Promise<any> {
        return await this.todoModel.updateOne({_id: id}, {edit : true}).exec()
}
    async updateTodo(createTodoDto ,id: string): Promise<any> {
        return await this.todoModel.updateOne({_id: id}, {task: createTodoDto.task, edit: createTodoDto.edit}).exec()
    }

    async deleteTodo(id:string){
        return await this.todoModel.deleteOne({_id:id}).exec()
    }

    async deleteAllTodo(id){
        return await this.todoModel.deleteMany({user: id}).exec()
    }

}