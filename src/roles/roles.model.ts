import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/users.model";
import {UserRole} from "../intermediate-models/user-role.model";

export interface IRoleCreateAttrs {
    value: string;
    description: string;
}

@Table({tableName: "roles"})
export class Role extends Model<Role, {}> {

    @ApiProperty({example: "1", description: 'Uniq id'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    readonly id: number;

    @ApiProperty({example: "Admin", description: 'Value of user role'})
    @Column({type: DataType.STRING, unique: true})
    value: string;

    @ApiProperty({example: "good man", description: 'Description of role'})
    @Column({type: DataType.STRING})
    description: string;

    @BelongsToMany(() => User, () => UserRole)
    users: User[];
}