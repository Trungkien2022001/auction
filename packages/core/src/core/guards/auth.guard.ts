import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ROLES_KEY } from '@kauction/constant';

export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const roles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());

    const authorization: string =
      request.headers.authorization || request.headers.Authorization;
    const access_token = authorization ? authorization.split(' ')[1] : null;

    console.log('Token: ', access_token);

    return false;
  }
}
