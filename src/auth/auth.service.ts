import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto} from "../users/dto/create-user.dto";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from "bcryptjs"
import {HashSaltKeys} from "../constants/hashKeys";
import {User} from "../users/users.model";
import {JwtLifeExpectancyKeys} from "../constants/jwtKeys";
import {IJwtTokens} from "./interfaces/jwt-tokens.interface";
import {IAuthUser} from "./interfaces/auth-user.interface";
import {ApiErrors} from "../constants/apiErrors";

@Injectable()
export class AuthService {

    constructor(private userService: UsersService,
                private jwtService: JwtService) {}

    private handlerNoAuthError() {
        throw new UnauthorizedException({message: ApiErrors.USER_IS_NOT_AUTHORIZED});
    }


    private async generateTokens(user: User): Promise<IJwtTokens> {
        const payload = {email: user.email, id: user.id, roles: user.roles}

        const accessToken = await this.jwtService.signAsync(payload,
            {
                expiresIn: JwtLifeExpectancyKeys.ACCESS,
                secret: process.env.JWT_ACCESS_SECRET
            }
        )
        const refreshToken = await this.jwtService.signAsync(payload,
            {
                expiresIn: JwtLifeExpectancyKeys.REFRESH,
                secret: process.env.JWT_REFRESH_SECRET
            }
        )

        return {
            accessToken,
            refreshToken
        }
    }

    private async validateUser(userDto: CreateUserDto): Promise<User> {
        const candidate = await this.userService.getByEmail(userDto.email);
        if(!candidate) throw new HttpException(
            ApiErrors.USER_CANNOT_WAS_FOUND_BY_THIS_EMAIL,
            HttpStatus.BAD_REQUEST
        )
        const passwordIsEqual = await bcrypt.compare(userDto.password,candidate.password);
        if(!passwordIsEqual) throw new UnauthorizedException({message: ApiErrors.INCORRECT_EMAIL_OR_PASSWORD});
        return candidate;
    }

    async refreshTokens (userDto: CreateUserDto): Promise<IJwtTokens> {
        const user = await this.userService.getByEmail(userDto.email)
        return await this.generateTokens(user)
    };

    async refresh (refreshToken : string): Promise<IAuthUser> {
        if(!refreshToken) this.handlerNoAuthError();
        const tokenIsValid = await this.jwtService.verifyAsync(refreshToken, {secret: process.env.JWT_REFRESH_SECRET});
        if(!tokenIsValid)  this.handlerNoAuthError();
        const userPayload = this.jwtService.decode(refreshToken, {complete: true,json: true})
        // @ts-ignore
        const userId: number = userPayload.payload.id;
        const user = await this.userService.getById(userId);
        const tokens = await this.generateTokens(user);
        return {user,tokens};
    }

    async login(userDto: CreateUserDto): Promise<IAuthUser> {
        const user = await this.validateUser(userDto);
        const tokens = await this.generateTokens(user);
        return {user,tokens}
    }

    async registration(userDto: CreateUserDto): Promise<IAuthUser> {
        const candidate = await this.userService.getByEmail(userDto.email);
        if (candidate) throw new HttpException(
            ApiErrors.USER_WITH_THIS_EMAIL_ALREADY_EXISTS,
            HttpStatus.BAD_REQUEST
        )
        const hashPassword = await bcrypt.hash(userDto.password, HashSaltKeys.MIDDLE);
        const user = await this.userService.create({...userDto, password: hashPassword});
        const tokens = await this.generateTokens(user);
        return {user,tokens}
    }

}
