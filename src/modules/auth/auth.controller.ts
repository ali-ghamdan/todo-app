import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { createAccountDto } from './dtos/createAccount.dto';
import { loginAccountDto } from './dtos/loginAccount.dto';
import { AuthGuard } from './auth.guard';
import { UsersService } from '../users/users.service';
import { GetTaskStatus } from '../tasks/tasks.config';

@Controller('auth')
export class AuthController {
  constructor(
    private AuthService: AuthService,
    private UserService: UsersService,
  ) {}

  @Post('register')
  async register(@Body() createAccountDto: createAccountDto) {
    const user = await this.AuthService.register(
      createAccountDto.username,
      createAccountDto.email,
      createAccountDto.password,
    );
    return {
      username: user.username,
      email: user.email,
      id: user._id,
    };
  }

  @Post('login')
  login(@Body() loginAccountDto: loginAccountDto) {
    return this.AuthService.login(
      loginAccountDto.email,
      loginAccountDto.password,
    );
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async profile(@Request() req) {
    const user = await this.UserService.findUser(undefined, req.user.sub);

    return {
      username: user.username,
      ...req.user,
      tasksLength: user.tasks.length,
      isDeleted: user.isDeleted,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
