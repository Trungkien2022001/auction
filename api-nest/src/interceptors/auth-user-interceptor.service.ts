// auth/jwt.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { JwtService } from 'src/auth/jwt.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
// import { JwtService } from './jwt.service';

@Injectable()
export class JwtInterceptor implements NestInterceptor {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}
  private readonly logger = new Logger(JwtInterceptor.name);

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['x-access-token'];
    this.logger.log('Token' + token);

    if (token) {
      try {
        const decoded = this.jwtService.verifyToken(token);

        if (decoded) {
          if (decoded.exp && Date.now() >= decoded.exp * 1000) {
            throw new HttpException(
              'Token has expired',
              HttpStatus.UNAUTHORIZED,
            ); // Ngăn chặn với lỗi 401 Unauthorized
          }
          const user = await this.userRepository.findOne({
            where: {
              email: decoded.username,
              del_flag: 0,
            },
            relations: ['role'],
          });
          if (!user) {
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED); // Ngăn chặn với lỗi 401 Unauthorized
          }

          request.user = user;
        }
      } catch (error) {
        // Xử lý lỗi khi giải mã token hoặc các lỗi khác
        console.error(error.message);
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED); // Ngăn chặn với lỗi 401 Unauthorized
      }
    } else {
      throw new HttpException('Token has expired', HttpStatus.UNAUTHORIZED);
    }

    return next.handle();
  }
}
