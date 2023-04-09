import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TasksRepository} from "./tasks.repository";
import {Task} from "./task.entity";
import {AuthModule} from "../auth/auth.module";

@Module({
  imports: [TypeOrmModule.forFeature([Task]), //forFeature is a method that we can use to register a repository
      AuthModule, //import the AuthModule
  ],
  controllers: [TasksController], //import the TasksController
  providers: [TasksService, TasksRepository], //import the TasksService and TasksRepository
})
export class TasksModule {}
