/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from '../../core/dto/login.dto';
import { SignUpDto } from '../../core/dto/signup.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) { }

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { firstName, lastName, email, password, role } = signUpDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.usersService.createUser({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role
    });

    const token = await this.jwtService.signAsync({ id: user.id, role: user.role }, {
      secret: process.env.JWT_SECRET
    });

    return { token };
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email } = loginDto;

    const user = await this.usersService.getUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // const isPasswordMatched = await bcrypt.compare(password, user.password);

    // if (!isPasswordMatched) {
    //   throw new UnauthorizedException('Invalid email or password');
    // }

    const token = await this.jwtService.signAsync({ id: user.id, role: user.role }, {
      secret: process.env.JWT_SECRET
    });

    return { token };
  }
}
