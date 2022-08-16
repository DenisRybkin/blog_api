import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Role} from "./roles.model";
import {CreateRoleDto} from "./dto/create-role.dto";

@Injectable()
export class RolesService {


    constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

    async create(dto: CreateRoleDto): Promise<Role | undefined> {
        return await this.roleRepository.create(dto);
    }

    async getAll(): Promise<Role[] | undefined> {
        return await this.roleRepository.findAll();
    }

    async getByValue(value: string): Promise<Role | undefined> {
        return await this.roleRepository.findOne({where: {value}})
    }

    async remove(id:number): Promise<number | undefined> {
        return await this.roleRepository.destroy({where: {id}});
    }

}
