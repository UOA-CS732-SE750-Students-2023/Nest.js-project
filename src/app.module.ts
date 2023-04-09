import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule} from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
      TasksModule, //This is to import the tasks module
      TypeOrmModule.forRoot({ //This is to connect to the database
        type:'postgres',
        host: 'localhost',
        port:5432,
        username:'postgres',
        password:'postgres',
        database:'task-management',
        autoLoadEntities:true,
        synchronize:true,
      }),
      AuthModule //This is to import the auth module
  ],

})
export class AppModule {}
