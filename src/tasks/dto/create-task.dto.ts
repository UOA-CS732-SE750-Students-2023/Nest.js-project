import {IS_NOT_EMPTY_OBJECT, IsNotEmpty} from "class-validator";


export class CreateTaskDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;
}