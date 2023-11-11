// auth.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core'; // Thay đổi đường dẫn tới role type của bạn
import { UserEntity } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from 'src/auth/jwt.service';
import { RoleType } from 'src/constants/role.constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles: string[] = this.reflector.get<RoleType[]>(
      'roles',
      context.getHandler(),
    );

    if (roles === undefined || roles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = request.headers['x-access-token'];

    if (!token) {
      return false; // Nếu không có token, từ chối truy cập
    } else {
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
          return !!roles.filter((role) => user.role[role]).length;
        }
      } catch (error) {
        // Xử lý lỗi khi giải mã token hoặc các lỗi khác
        console.error(error.message);
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED); // Ngăn chặn với lỗi 401 Unauthorized
      }
    }

    //   return next.handle();
    // }

    //   try {
    //     const decoded = this.jwtService.verifyToken(token);
    //     request.user = decoded;

    //     if (roles.some((role) => decoded.roles.includes(role))) {
    //       return true; // Nếu người dùng có ít nhất một trong những quyền yêu cầu, cho phép truy cập
    //     }

    //     return false; // Người dùng không có quyền yêu cầu
    //   } catch (error) {
    //     console.error(error.message);
    //     return false; // Lỗi khi xác thực token, từ chối truy cập
    //   }
    // }
  }
}
