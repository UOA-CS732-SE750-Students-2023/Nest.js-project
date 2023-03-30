import { Task, TaskStatus } from "./task.model";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
export declare class TasksService {
    private tasks;
    getAllTasks(): Task[];
    getTasksWithFilters(filterDto: GetTasksFilterDto): Task[];
    getTaskById(id: string): Task;
    deleteTaskById(id: string): void;
    updateTasksStatus(id: string, status: TaskStatus): Task;
    createTask(createTaskDto: CreateTaskDto): Task;
}
