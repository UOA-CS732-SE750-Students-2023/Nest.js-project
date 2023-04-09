import {TaskStatus} from "../task.status.enum";
import {IsEnum} from "class-validator";

export class UpdateTaskStatusDto{
    //the IsEnum decorator is used from the class-validator library to ensure that the status property only contains values that are part of the TaskStatus enum.
    @IsEnum(TaskStatus)
    status: TaskStatus;
}