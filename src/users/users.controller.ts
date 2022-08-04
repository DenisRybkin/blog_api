import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {UsersService} from "./users.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./users.model";
import {UpdateUserDto} from "./dto/update-user.dto";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {Roles} from "../auth/decorators/roles-auth.decorator";
import {RoleKeys} from "../constants/role-keys";
import {RolesGuard} from "../auth/guards/roles.guard";
import {AddRoleDto} from "./dto/add-role.dto";
import {BanUserDto} from "./dto/ban-user.dto";
import {ValidationPipe} from "../pipes/validation.pipe";

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

    @ApiOperation({summary: "Assigning a roles"})
    @ApiResponse({status: 200, type: User})
    @Roles(RoleKeys.ADMIN)
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Post("/role")
    addRole(@Body() dto: AddRoleDto) {
        return this.userService.addRole(dto);
    }

    @ApiOperation({summary: "Baning a user"})
    @ApiResponse({status: 200, type: User})
    @Roles(RoleKeys.ADMIN)
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Post("/ban")
    ban(@Body() dto: BanUserDto) {
        return this.userService.ban(dto);
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
    @Roles(RoleKeys.ADMIN)
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Delete("/:id")
    remove(@Param('id') id: string) {
        return this.userService.remove(Number(id));
    }
}
