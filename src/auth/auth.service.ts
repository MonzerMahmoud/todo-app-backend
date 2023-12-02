import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/signIn-auth.dto';
import { SignUpDto } from './dto/signUp-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<any> {
    const user = await this.usersService.findOneByUsername(signInDto.username);

    if (user?.password != signInDto.password) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(signUpDto: SignUpDto) {
    const user = await this.usersService.findOneByUsername(signUpDto.username);

    if (user) {
      return {
        message: 'User already exist',
      };
    }

    const newUser = await this.usersService.create(
      signUpDto.username,
      signUpDto.password,
    );

    const payload = { sub: newUser.id, username: newUser.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  findAll() {
    return `The auth module is working fine and you are authorized`;
  }
}
