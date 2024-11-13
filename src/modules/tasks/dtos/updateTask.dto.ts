import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../tasks.types';

export default class updateTaskDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @IsBoolean()
  @IsOptional()
  isDeleted?: boolean;
}
