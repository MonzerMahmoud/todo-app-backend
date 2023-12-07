import { IsNotEmpty } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  readonly username: string;
  @IsNotEmpty()
  readonly password: string;
}
