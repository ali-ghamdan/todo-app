import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task, taskSchema } from '../../schemas/task.schema';
import { User, userSchema } from 'src/schemas/user.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: userSchema,
      },
    ]),

    MongooseModule.forFeature([
      {
        name: Task.name,
        schema: taskSchema,
      },
    ]),
  ],
  controllers: [TaskController],
  providers: [TasksService],
  exports: [],
})
export class TasksModule {}
