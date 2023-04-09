import {DataSource, EntityRepository, getRepository, Repository} from "typeorm";
import {Task} from "./task.entity";
import {CreateTaskDto} from "./dto/create-task.dto";
import {TaskStatus} from "./task.status.enum";
import {Injectable} from "@nestjs/common";
import {GetTasksFilterDto} from "./dto/get-tasks-filter.dto";
import {User} from "../auth/user.entity";

@Injectable()
export class TasksRepository extends Repository<Task>{
    constructor(private dataSource: DataSource) {
        super(Task, dataSource.createEntityManager());
    }

    async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]>{
        const {status, search} = filterDto;
        const query = this.createQueryBuilder('task');//create a query builder
        query.where({user});//add a where clause to our query to filter the tasks

        if (status){
            query.andWhere('task.status = :status', {status});
            //andWhere is a method that we can use to add a where clause to our query
            //the first argument status should correspond to the second argument
        }
        if (search){
            query.andWhere('((LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)))', {search: `%${search}%`})
            //the first argument is the where clause
            //Percentage sign will find any string that contains the search term
        }

        const tasks = await query.getMany(); //getMany is a method that we can use to get all the tasks that match our query
        return tasks;
    }

    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task>{
        const {title, description} = createTaskDto;
        //Desctructure the createTaskDto object to get the title and description
        const task = this.create({
            title,
            description,
            status: TaskStatus.OPEN,
            user, //the purpose of adding the user property is to help to make sure that the user is the owner of the task
        });
        //Create a new task object

        await this.save(task); //save the task into the database
        return task;
    }


}



