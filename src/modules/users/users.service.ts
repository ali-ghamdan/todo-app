import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { hash } from 'bcrypt';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private usersModel: Model<User>) {}

  async findUser(email?: string, id?: string) {
    if (!email && !id) throw new UnauthorizedException();
    const user = await this.usersModel.findOne(email ? { email } : { _id: id });
    if (!user) throw new NotFoundException("user wasn't found.");

    return user;
  }

  async createUser(username: string, email: string, password: string) {
    try {
      const user = await this.usersModel.create({
        username,
        email,
        password: await hash(password, 10),
      });
      return user;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException(
          'Creating an Already exsists account, try another email',
        );
      }

      throw new NotFoundException('Something went wrong');
    }
  }
}
