import {
  type CanActivate,
  type ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as _ from 'lodash';
import { RoleType } from 'src/constants/role.constants';

// import { type RoleType } from '../constants';
import { UserEntity } from 'src/user/entities/user.entity';
// import { type UserEntity } from '../modules/user/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<RoleType>('roles', context.getHandler());

    if (_.isEmpty(roles)) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = <UserEntity>request.user;

    // return roles.includes(user.role);
    return true;
  }
}
