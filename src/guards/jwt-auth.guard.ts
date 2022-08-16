import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from 'rxjs';
import { JwtService } from "@nestjs/jwt";
import {ApiErrors} from "../constants/apiErrors";

@Injectable()
export class JwtAuthGuard implements CanActivate {

    constructor(private jwtService: JwtService) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        try {
            const authHeader = req.headers.authorization;
            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];

            if(bearer !== "Bearer" || !token) throw new UnauthorizedException({message: ApiErrors.USER_IS_NOT_AUTHORIZED});

            const user = await this.jwtService.verifyAsync(token, {secret: process.env.JWT_ACCESS_SECRET});
            if(!user)  throw new UnauthorizedException({message: ApiErrors.USER_IS_NOT_AUTHORIZED});

            req.user = user;
            return true;
        } catch (e) {
            throw new UnauthorizedException({message: ApiErrors.USER_IS_NOT_AUTHORIZED});
        }
    }
    
}