import { IsEnum, IsString } from 'class-validator';
import { TaskStatus } from '../tasks.types';

export default class createTaskDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum(TaskStatus)
  status: TaskStatus;
}
