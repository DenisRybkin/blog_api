import {Body, Controller, Delete, Get, Param, Post, UseGuards} from '@nestjs/common';
import {RolesService} from "./roles.service";
import {CreateRoleDto} from "./dto/create-role.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Role} from "./roles.model";
import {User} from "../users/users.model";
import {Roles} from "../auth/decorators/roles-auth.decorator";
import {RoleKeys} from "../constants/role-keys";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {RolesGuard} from "../auth/guards/roles.guard";

@ApiTags("Authorization")
@Controller('roles')
export class RolesController {
    constructor(private rolesService: RolesService) {}

    @ApiOperation({summary: "Getting roles"})
    @ApiResponse({status: 200, type: [Role]})
    @Get()
    getAll() {
        return this.rolesService.getAll()
    }

    @ApiOperation({summary: "Getting role by value"})
    @ApiResponse({status: 200, type: Role})
    @Get('/:value')
    getByValue(@Param('value') value: string) {
        return this.rolesService.getByValue(value);
    }

    @ApiOperation({summary: "Creating role"})
    @ApiResponse({status: 200, type: Role})
    @Roles(RoleKeys.ADMIN)
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Post()
    create(@Body() dto: CreateRoleDto) {
        return this.rolesService.create(dto);
    }

    @ApiOperation({summary: "Delete role by id"})
    @ApiResponse({status: 200, type: User})
    @Roles(RoleKeys.ADMIN)
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Delete("/:id")
    remove(@Param('id') id: string) {
        return this.rolesService.remove(Number(id));
    }

}
