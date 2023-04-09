import {Injectable, NotFoundException} from '@nestjs/common';
import {TaskStatus} from "./task.status.enum";
import {CreateTaskDto} from "./dto/create-task.dto";
import {TasksRepository} from "./tasks.repository";
import {Task} from "./task.entity";
import {GetTasksFilterDto} from "./dto/get-tasks-filter.dto";
import {User} from "../auth/user.entity";

@Injectable()
export class TasksService {
    constructor(
        private taskRepository: TasksRepository
    ) {}

    getTasks(filterDto:GetTasksFilterDto, user: User): Promise<Task[]>{
        return this.taskRepository.getTasks(filterDto, user);
    }

    async getTaskById(id: string, user: User): Promise<Task>{
        //get a task by its id
        // user parameter is used to make sure that the user is the owner of the task
        const found = await this.taskRepository.findOne({where: {id, user}});
        //findOne is a method that we can use to find a single entity

        if (!found){
            throw new NotFoundException(`Task with ID: ${id} is not found!`);
        }
        return found
    }

    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task>{
        return this.taskRepository.createTask(createTaskDto, user);
    }

    async deleteTaskById(id: string, user: User): Promise<void>{
        const result = await this.taskRepository.delete({id, user});
        //delete is a method that we can use to delete an entity
        //user parameter is used to make sure that the user is the owner of the task
        if (result.affected === 0){ //affected is a property that tells us how many entities were deleted
            throw new NotFoundException(`Task with ID: ${id} is not found!`);
        }
    }

    async updateTasksStatus(id: string, status: TaskStatus, user: User):Promise<Task>{
        const task = await this.getTaskById(id, user);
        //get a task by its id, user parameter is used to make sure that the user is the owner of the task
        task.status = status;
        //update the status of the task
        await this.taskRepository.save(task);
        //save the task
        return task;
    }
}
