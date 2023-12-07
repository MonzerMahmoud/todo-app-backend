import { IsNotEmpty } from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  readonly password: string;
}
