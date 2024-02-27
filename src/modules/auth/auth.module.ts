/* eslint-disable prettier/prettier */
import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from '../../controllers/auth/auth.controller';
import User from '../../core/entities/user.entity';
import { AuthService } from '../../services/auth/auth.service';
import { AuthGuard } from '../../core/guards/auth.guard';
import { UserService } from '../../services/user/user.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    JwtService,
    UserService
  ],
  exports: [AuthService],
})
export class AuthModule { }
