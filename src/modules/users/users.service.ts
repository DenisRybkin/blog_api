import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {User} from "./users.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateUserDto} from "./dto/create-user.dto";
import {RolesService} from "../roles/roles.service";
import {RoleKeys} from "../../constants/role-keys";
import {UpdateUserDto} from "./dto/update-user.dto";
import {AddRoleDto} from "./dto/add-role.dto";
import {BanUserDto} from "./dto/ban-user.dto";
import {ApiErrors} from "../../constants/apiErrors";

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

    async addRole(dto: AddRoleDto): Promise<User | AddRoleDto> {
        const user = await this.getById(dto.userId);
        const role = await this.roleService.getByValue(dto.value);
        if(role && user) {
            await user.$add('role',role.id)
            return dto;
        }
        throw new HttpException(ApiErrors.USER_OR_ROLE_404, HttpStatus.NOT_FOUND);
    }

    async ban(dto: BanUserDto): Promise<User> {
        const user = await this.getById(dto.userId);
        if(!user) throw new HttpException(ApiErrors.USER_OR_ROLE_404, HttpStatus.NOT_FOUND);
        user.banned = true;
        user.banReason = dto.banReason;
        return await user.save();
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
