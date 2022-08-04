import {BelongsToMany, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/users.model";
import {Role} from "../roles/roles.model";

@Table({tableName: "user-role",createdAt: false,updatedAt: false})
export class UserRole extends Model<UserRole, {}> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    readonly id: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @ForeignKey(() => Role)
    @Column({type: DataType.INTEGER})
    roleId: number;

}