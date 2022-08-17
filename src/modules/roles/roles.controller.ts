import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import {RolesService} from "./roles.service";
import {CreateRoleDto} from "./dto/create-role.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Role} from "./roles.model";
import {User} from "../users/users.model";
import { Roles } from '../../decorators/roles-auth.decorator';
import { RoleKeys } from '../../constants/role-keys';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';

@ApiTags("Authorization")
@Controller('roles')
export class RolesController {
    constructor(private rolesService: RolesService) {}

    @ApiOperation({summary: "Getting roles"})
    @ApiResponse({status: 200, type: [Role]})
    @UseGuards(JwtAuthGuard)
    @Get()
    getAll() {
        return this.rolesService.getAll()
    }

    @ApiOperation({summary: "Getting role by value"})
    @ApiResponse({status: 200, type: Role})
    @UseGuards(JwtAuthGuard)
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
    remove(@Param('id',ParseIntPipe) id: number) {
        return this.rolesService.remove(id);
    }

}
