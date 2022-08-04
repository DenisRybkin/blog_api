import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {UsersService} from "./users.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./users.model";
import {UpdateUserDto} from "./dto/update-user.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@ApiTags("Users")
@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {
    }

    @ApiOperation({summary: "Getting users"})
    @ApiResponse({status: 200, type: [User]})
    @Get()
    getAll() {
        return this.userService.getAll();
    }

    @ApiOperation({summary: "Getting user by id"})
    @ApiResponse({status: 200, type: User})
    @Get("/:id")
    getById(@Param('id') id: string) {
        return this.userService.getById(Number(id));
    }

    @ApiOperation({summary: "Creating user"})
    @ApiResponse({status: 200, type: User})
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.userService.create(userDto);
    }

    @ApiOperation({summary: "Updating user"})
    @ApiResponse({status: 200, type: User})
    @UseGuards(JwtAuthGuard)
    @Put("/:id")
    update(@Param("id") id: string,@Body() userDto: UpdateUserDto) {
        return this.userService.update(Number(id), userDto);
    }

    @ApiOperation({summary: "Delete user by id"})
    @ApiResponse({status: 200, type: User})
    @UseGuards(JwtAuthGuard)
    @Delete("/:id")
    remove(@Param('id') id: string) {
        return this.userService.remove(Number(id));
    }
}
