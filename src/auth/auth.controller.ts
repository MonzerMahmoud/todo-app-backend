import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Request,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { SignInDto } from './dto/signIn-auth.dto';
import { SignUpDto } from './dto/signUp-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    console.log(signInDto);
    return this.authService.signIn(signInDto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('register')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  //@UseGuards(AuthGuard)
  @Get()
  findAll(@Request() req) {
    console.log(req.user);
    return this.authService.findAll();
  }
}
