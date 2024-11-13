import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private UsersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.UsersService.findUser(email);
    if (!user) throw new UnauthorizedException("user doesn't exists");
    const isMatch = await compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid Password.');
    return {
      access_token: await this.jwtService.signAsync(
        {
          sub: user._id,
          email: user.email,
        },
        {
          secret: process.env.JWT_SECRET,
        },
      ),
    };
  }

  async register(username: string, email: string, password: string) {
    return await this.UsersService.createUser(username, email, password);
  }
}
