import { TaskStatus } from "./task.status.enum";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TasksRepository } from "./tasks.repository";
import { Task } from "./task.entity";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { User } from "../auth/user.entity";
export declare class TasksService {
    private taskRepository;
    constructor(taskRepository: TasksRepository);
    getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]>;
    getTaskById(id: string, user: User): Promise<Task>;
    createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task>;
    deleteTaskById(id: string, user: User): Promise<void>;
    updateTasksStatus(id: string, status: TaskStatus, user: User): Promise<Task>;
}
