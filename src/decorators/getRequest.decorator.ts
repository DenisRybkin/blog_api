import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const getRequest = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    return ctx.switchToHttp().getRequest();
  }
)