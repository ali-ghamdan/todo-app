import { IsString } from 'class-validator';

export class createAccountDto {
  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  username: string;
}
