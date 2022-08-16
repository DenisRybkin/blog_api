import { Injectable, ParseIntPipe, PipeTransform, UnauthorizedException } from '@nestjs/common';
import { ApiErrors } from '../constants/apiErrors';

@Injectable()
export class UserIdPipe implements PipeTransform<any> {

  transform(request: any) {
      const userId = request.user.id;
      if(!userId || isNaN(userId))
        throw new UnauthorizedException({message: ApiErrors.USER_IS_NOT_AUTHORIZED});
      return userId;
  }
}