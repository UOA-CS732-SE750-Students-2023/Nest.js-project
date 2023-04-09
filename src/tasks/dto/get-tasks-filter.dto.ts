import {TaskStatus} from "../task.status.enum";
import {IsEnum, IsOptional, IsString} from "class-validator";

export class GetTasksFilterDto{
    @IsOptional()//this decorator will make sure that the status is optional
    @IsEnum(TaskStatus) //the IsEnum decorator is used from the class-validator library to ensure that the status property only contains values that are part of the TaskStatus enum.
    status?: TaskStatus;

    @IsOptional()//this decorator will make sure that the search term is optional
    @IsString()//this decorator will make sure that the search term is a string
    search?: string;
}