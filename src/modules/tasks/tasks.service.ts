import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from 'src/schemas/task.schema';
import createTaskDto from './dtos/createTask.dto';
import updateTaskDto from './dtos/updateTask.dto';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<Task>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async create(userId: string, createTaskDto: createTaskDto) {
    const task = await this.taskModel.create({
      title: createTaskDto.title,
      description: createTaskDto.description,
      status: createTaskDto.status,
      user: userId,
    });
    const t = await this.userModel
      .findByIdAndUpdate(userId, {
        $push: { tasks: task._id },
      })
      .catch(console.error);
    if (!t) {
      if (task) await task.deleteOne();
      throw new ForbiddenException('something went wrong.');
    }
    return {
      _id: task._id,
      title: task.title,
      user: task.user,
      description: task.description,
      status: task.status,
    };
  }

  async update(userId: string, _id: string, updateTaskDto: updateTaskDto) {
    const task = await this.taskModel
      .findOneAndUpdate({ _id, user: userId }, updateTaskDto, {
        new: true,
      })
      .lean();
    if (!task) throw new NotFoundException('Task not found with id: ' + _id);

    return {
      _id: task._id,
      title: task.title,
      description: task.description,
      status: task.status,
      user: userId,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
      isDeleted: task.isDeleted,
    };
  }

  async findAll(userId: string, page: number = 0, withDeleted: boolean) {
    if (page < 0) page = 0;
    const tasks = await this.taskModel
      .find({
        user: userId,
        isDeleted: false,
      })
      .skip(page * 10)
      .limit(10)
      .lean();
    return tasks.map((task) => {
      return {
        _id: task._id,
        title: task.title,
        description: task.description,
        status: task.status,
        isDeleted: task.isDeleted,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
      };
    });
  }

  async count(userId: string) {
    return (
      await this.taskModel
        .find({
          user: userId,
          isDeleted: false,
        })
        .lean()
    ).length;
  }

  async findOne(userId: string, _id: string) {
    const task = await this.taskModel.findOne({ _id, user: userId }).lean();
    if (!task) throw new NotFoundException('Task not found with id: ' + _id);

    return {
      _id: task._id,
      title: task.title,
      description: task.description,
      status: task.status,
      isDeleted: task.isDeleted,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
  }

  async delete(userId: string, _id: string) {
    const task = await this.update(userId, _id, { isDeleted: true });
    if (!task) throw new NotFoundException('Task not found with id: ' + _id);
    await this.userModel.findByIdAndUpdate(userId, {
      $pull: {
        tasks: _id,
      },
    });
    return {
      _id: task._id,
      title: task.title,
      description: task.description,
      status: task.status,
      user: userId,
      isDeleted: task.isDeleted,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
  }
}
