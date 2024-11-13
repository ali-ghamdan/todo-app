import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import createTaskDto from './dtos/createTask.dto';
import updateTaskDto from './dtos/updateTask.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('tasks')
@UseGuards(AuthGuard)
export class TaskController {
  constructor(private tasksService: TasksService) {}

  @Post()
  create(@Request() req, @Body() createTaskDto: createTaskDto) {
    return this.tasksService.create(req.user.sub, createTaskDto);
  }

  @Get()
  findAll(
    @Request() req,
    @Query('page') page: number = 1,
    @Query('include_deleted') withDeleted: boolean = false,
  ) {
    return this.tasksService.findAll(req.user.sub, page - 1, withDeleted);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.tasksService.findOne(req.user.sub, id);
  }

  @Put(':id')
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateTaskDto: updateTaskDto,
  ) {
    return this.tasksService.update(req.user.sub, id, updateTaskDto);
  }

  @Delete(':id')
  delete(@Request() req, @Param('id') id: string) {
    return this.tasksService.delete(req.user.sub, id);
  }
}
