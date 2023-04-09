import {IsNotEmpty} from "class-validator";

export class CreateTaskDto {
    @IsNotEmpty() //this decorator will make sure that the title is not empty
    title: string;

    @IsNotEmpty()
    description: string;
}