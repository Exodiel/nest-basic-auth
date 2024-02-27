/* eslint-disable prettier/prettier */
import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
        DATABASE_USER: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
        PORT: Joi.number(),
      }),
    }),
    AuthModule,
    UserModule,
    DatabaseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
