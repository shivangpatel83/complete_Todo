import {Body, Controller, Delete, Get, Param, Post, Put} from "@nestjs/common";
import {CreateTodoDto} from "./todoDto/create-todo.Dto";
import {TodoServices} from "./todo.services";

@Controller('todo')
export class TodoController{

    constructor(private readonly todoServices: TodoServices) {
    }
    @Post(':id')
    createTodo(@Body() createTodoDto: CreateTodoDto, @Param('id') id: string ){
        return this.todoServices.createTodo(createTodoDto, id);
    }

    @Get(":id")
    getAllTodos(@Param('id') id: string){
        return this.todoServices.getAllTodos(id)
    }

    @Get('/allincompleted/:id')
    findAllIncompleted(@Param('id') id: string){
        return this.todoServices.findAllIncompleteTodo(id);
    }

    @Get('/allcompleted/:id')
    findAllCompleted(@Param('id') id: string){
        return this.todoServices.findAllCompleteTodo(id);
    }

    @Put('complete/:id')
    updateCompleted( @Param('id') id:string){
        return this.todoServices.updateComplete(id)
    }

    @Put('edit/:id')
    setEditButton(@Param('id') id:string){
        return this.todoServices.setEditButton(id)
    }
    @Put('task/:id')
    updateTodo(@Body() createTodoDto: CreateTodoDto, @Param('id') id:string){
        return this.todoServices.updateTodo(createTodoDto, id)
    }

    @Delete(':id')
    deleteOne(@Param('id') id: string){
        return this.todoServices.deleteTodo(id)
    }

    @Delete("/delete/:id")
    deleteAll(@Param("id") id : string){
        return this.todoServices.deleteAllTodo(id);
    }
}