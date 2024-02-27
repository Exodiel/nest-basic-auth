/* eslint-disable prettier/prettier */
import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import User from '../../core/entities/user.entity';
import { CreateUserDto } from '../../core/dto/create-user.dto';

export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async getAllUsers() {
    const users = this.usersRepository.find();
    return users;
  }

  async getUserById(id: number) {
    const user = await this.usersRepository.findOne({
      where: {
        id: id,
      },
    });
    if (user) {
      return user;
    }
    throw new NotFoundException('Could not find the user');
  }

  async getUserByEmail(email: string) {
    const user = await this.usersRepository.findOne({
      where: {
        email,
      },
    });
    if (user) {
      return user;
    }
    throw new NotFoundException('Could not find the user');
  }

  async createUser(createUserDto: CreateUserDto) {
    const { password, email, firstName, lastName, role } = createUserDto
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.usersRepository.create({
      password: hashedPassword,
      email,
      firstName,
      lastName,
      role
    });
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async deleteById(id: number) {
    const user = await this.usersRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!user) {
      return null;
    }

    await this.usersRepository.remove(user);
    return user;
  }
}
