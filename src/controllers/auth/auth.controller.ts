/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { IsPublic } from '../../core/decorators/public.decorator';
import { LoginDto } from '../../core/dto/login.dto';
import { SignUpDto } from '../../core/dto/signup.dto';
import { AuthService } from '../../services/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @IsPublic()
  @Post('/signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    return this.authService.signUp(signUpDto);
  }

  @IsPublic()
  @Post('/login')
  login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto);
  }
}
