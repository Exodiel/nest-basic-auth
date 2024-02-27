import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  IsEnum,
} from 'class-validator';
import { ROLES } from '../../shared/constants';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsEnum(ROLES)
  role: ROLES;
}
