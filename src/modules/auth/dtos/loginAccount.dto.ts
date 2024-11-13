import { IsString } from 'class-validator';

export class loginAccountDto {
  @IsString()
  email: string;

  @IsString()
  password: string;
}
