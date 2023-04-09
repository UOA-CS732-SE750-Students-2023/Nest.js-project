import {Body, Controller, Delete, Get, Param, Post, Patch, Query, UseGuards} from '@nestjs/common';
import {TasksService} from "./tasks.service";
import {CreateTaskDto} from "./dto/create-task.dto";
import {GetTasksFilterDto} from "./dto/get-tasks-filter.dto";
import {UpdateTaskStatusDto} from "./dto/update-task-status.dto";
import {Task} from "./task.entity";
import {AuthGuard} from "@nestjs/passport";
import {GetUser} from "../auth/get-user.decorator";
import {User} from "../auth/user.entity";

@Controller('tasks') //this is the route
@UseGuards(AuthGuard()) //this is to protect the routes and make sure that the user is authenticated
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get('/:id') //this is the subroute using GET method and the id is a parameter passed in the url
    getTaskById(@Param('id') id:string, @GetUser() user: User): Promise<Task>{
        //@Param('id') is used to get the id from the url
        return this.tasksService.getTaskById(id, user);
    }

    @Post() //this is the subroute using POST method
    createTask(
        @Body() createTaskDto: CreateTaskDto, //this is used to get the body of the request and encapsulate it in the CreateTaskDto object
        @GetUser() user: User //this is a custom decorator that we created, it is used to extract the user object
    ): Promise<Task>{
        return this.tasksService.createTask(createTaskDto, user);
    }

    @Get() //this is the subroute using GET method
    getTasks(
        @Query() filterDto: GetTasksFilterDto, //this is used to get the query parameters
        @GetUser() user: User //this is a custom decorator that we created, it is used to extract the user object
    ): Promise<Task[]>{
        return this.tasksService.getTasks(filterDto, user);
    }

    @Delete(`/:id`)//this is the subroute using DELETE method and the id is a parameter passed in the url
    deleteTaskById(
        @Param(`id`) id: string, //this is used to get the id from the url
        @GetUser() user: User //this is a custom decorator that we created, it is used to extract the user object
        ):Promise<void> {
        return this.tasksService.deleteTaskById(id, user);
    }
    //
    @Patch(`/:id/status`) //this is the subroute using PATCH method and the id is a parameter passed in the url
    updateTaskStatus(
        @Param(`id`) id: string, //this is used to get the id from the url
        @Body() updateTaskStatusDto: UpdateTaskStatusDto,
        //this is used to get the body of the request and encapsulate it in the UpdateTaskStatusDto object
        @GetUser() user: User
        //this is a custom decorator that we created, it is used to extract the user object
    ):Promise<Task>{
        const {status} = updateTaskStatusDto;
        //this is used to get the status from the UpdateTaskStatusDto object

        return this.tasksService.updateTasksStatus(id, status, user);
    }

}
