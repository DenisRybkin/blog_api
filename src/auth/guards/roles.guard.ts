import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException
} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";
import {ApiErrors} from "../../constants/apiErrors";
import {Reflector} from "@nestjs/core";
import {ROLES_KEY} from "../decorators/roles-auth.decorator";

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private jwtService: JwtService, private reflect: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const requiredRoles = this.reflect.getAllAndOverride<string[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass()
            ]);
            if (!requiredRoles) return true;
            const req = context.switchToHttp().getRequest();
            const authHeader = req.headers.authorization;
            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];

            if (bearer !== "Bearer" || !token) throw new UnauthorizedException({message: ApiErrors.USER_IS_NOT_AUTHORIZED});
            const user = this.jwtService.verify(token, {secret: process.env.JWT_ACCESS_SECRET});
            req.user = user;


            return user.roles.some(role => requiredRoles.includes(role.value));
        } catch (e) {
            throw new HttpException(
                ApiErrors.FORBIDDEN,
                HttpStatus.FORBIDDEN
            );
        }
    }

}