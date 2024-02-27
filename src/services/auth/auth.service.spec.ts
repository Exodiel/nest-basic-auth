import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../user/user.service';
import { SignUpDto } from '../../core/dto/signup.dto';
import { ROLES } from '../../shared/constants';

describe('AuthService', () => {
  let authService: AuthService;
  let usersServiceMock: UserService;
  let jwtServiceMock: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            getUserByEmail: jest.fn(),
            createUser: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersServiceMock = module.get<UserService>(UserService);
    jwtServiceMock = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('should sign in a user and return an access token', async () => {
    const user = {
      firstName: 'Jipson',
      lastName: 'Saad',
      email: 'jsaad@iuvity.com',
      password: 'secret1',
      role: 'ADMIN',
    };

    user.password = await bcrypt.hash(user.password, 10);

    (usersServiceMock as any).getUserByEmail.mockResolvedValueOnce(user);
    (jwtServiceMock as any).signAsync.mockResolvedValueOnce('token');

    const response = await authService.login({
      email: 'jsaad@iuvity.com',
      password: 'secret1',
    });

    expect(response).toEqual({ token: 'token' });
  });

  it('should sign up a user and return the token', async () => {
    const user: SignUpDto = {
      firstName: 'Francisco',
      lastName: 'Marin',
      email: 'fmarin@iuvity.com',
      password: 'secret1',
      role: ROLES.BASIC,
    };

    (usersServiceMock as any).createUser.mockResolvedValueOnce(user);

    const response = await authService.signUp(user);

    expect(response).toHaveProperty('token');
  });
});
