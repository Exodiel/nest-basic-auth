/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { AdminAccess } from '../../core/decorators/admin.decorator';
import { CreateUserDto } from '../../core/dto/create-user.dto';
import User from '../../core/entities/user.entity';
import { AuthGuard } from '../../core/guards/auth.guard';
import { RolesGuard } from '../../core/guards/role.guard';
import { UserService } from '../../services/user/user.service';

@UseGuards(AuthGuard, RolesGuard)
@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) { }

  @AdminAccess()
  @Get()
  async getAllUsers() {
    const users = await this.usersService.getAllUsers();
    return instanceToPlain(users);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<Partial<User>> {
    const user = await this.usersService.getUserById(Number(id));
    return instanceToPlain(user);
  }

  @AdminAccess()
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.usersService.createUser(createUserDto);
    return instanceToPlain(newUser);
  }

  @AdminAccess()
  @Delete(':id')
  async deleteById(@Param('id') id: string): Promise<Partial<User>> {
    const user = this.usersService.deleteById(Number(id));
    return instanceToPlain(user);
  }
}
