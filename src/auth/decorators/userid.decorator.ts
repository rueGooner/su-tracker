import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload, RefreshTokenJwtPayload } from '../types/jwt.type';

export const CurrentUserId = createParamDecorator(
  (_: undefined, context: ExecutionContext): number => {
    const request = context.switchToHttp().getRequest();
    const user = request.user as JwtPayload;

    return user.sub;
  },
);

export const CurrentUser = createParamDecorator(
  (
    data: keyof RefreshTokenJwtPayload | undefined,
    context: ExecutionContext,
  ) => {
    const request = context.switchToHttp().getRequest();

    if (!data) return request.user;
    return request.user[data];
  },
);
