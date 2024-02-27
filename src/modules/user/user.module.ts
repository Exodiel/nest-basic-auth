/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '../../controllers/user/user.controller';
import User from '../../core/entities/user.entity';
import { UserService } from '../../services/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, JwtService],
  exports: [UserService]
})
export class UserModule { }
