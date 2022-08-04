import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {RolesService} from "./roles.service";
import {CreateRoleDto} from "./dto/create-role.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Role} from "./roles.model";
import {User} from "../users/users.model";

@ApiTags("Roles")
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
    @Post()
    create(@Body() dto: CreateRoleDto) {
        return this.rolesService.create(dto);
    }

    @ApiOperation({summary: "Delete role by id"})
    @ApiResponse({status: 200, type: User})
    @Delete("/:id")
    remove(@Param('id') id: string) {
        return this.rolesService.remove(Number(id));
    }

}
