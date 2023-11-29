/* eslint-disable @typescript-eslint/no-unused-vars */
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from './jwt.service';
import { JwtInterceptor } from 'src/interceptors/auth-user.interceptor.service';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { RolesGuard } from 'src/guards/roles.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { AddFieldFilter } from 'src/filters/test.filter';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtService,
    {
      provide: APP_FILTER,
      useClass: AddFieldFilter,
    },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: JwtInterceptor,
    // },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [JwtService],
})
export class AuthModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(JwtInterceptor).forRoutes('*');
  // }
}
