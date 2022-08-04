import {Body, Controller, Get, Post, Req, Res} from '@nestjs/common';
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {AuthService} from "./auth.service";

@ApiTags("Authorization")
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @ApiOperation({summary: "Authorization"})
    @Post("/login")
    async login(@Res() res,@Body() userDto: CreateUserDto){
        const authModel = await this.authService.login(userDto);
        res.cookie('refreshToken',authModel.tokens.refreshToken);
        return authModel;
    }

    @ApiOperation({summary: "Registration"})
    @Post("/registration")
    async registration(@Res() res, @Body() userDto: CreateUserDto){
        const authModel = await this.authService.registration(userDto);
        res.cookie('refreshToken',authModel.tokens.refreshToken);
        return authModel;
    }

    @ApiOperation({summary: "Refreshing tokens"})
    @Get('refresh')
    async refresh(@Req() req,@Res() res) {
        const {refreshToken} = req.cookies;
        const authModel = await this.authService.refresh(refreshToken);
        res.cookie('refreshToken',authModel.tokens.refreshToken);
        return authModel;
    }

    @ApiOperation({summary: "Logout"})
    @Get('logout')
    async logout(@Res() res) {
        return res.cookie('refreshToken',undefined);
    }
}
