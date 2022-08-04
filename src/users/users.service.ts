import { Injectable } from '@nestjs/common';
import {User} from "./users.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateUserDto} from "./dto/create-user.dto";
import {Role} from "../roles/roles.model";
import {RolesService} from "../roles/roles.service";
import {RoleKeys} from "../constants/role-keys";
import {UpdateUserDto} from "./dto/update-user.dto";

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User,
                private roleService: RolesService) {}


    async getAll(): Promise<User[] | undefined> {
        return await this.userRepository.findAll({include: {all: true}});
    }

    async getById(id: number): Promise<User | undefined> {
       return await this.userRepository.findByPk(id);
    }

    async getByEmail(email: string): Promise<User | undefined> {
        return this.userRepository.findOne({where: {email}, include: {all: true}})
    }

    async create(dto: CreateUserDto): Promise<User | undefined> {
        const user = await this.userRepository.create(dto);
        const role = await this.roleService.getByValue(RoleKeys.USER);
        await user.$set("roles", [role.id]);
        user.roles = [role];
        return user
    }

    async update(id:number,dto: UpdateUserDto) {
        return await this.userRepository.update(
            {...dto},
            {where: {id}}
        )
    }

    async remove(id:number): Promise<number | undefined> {
        return await this.userRepository.destroy({where: {id}});
    }
}
