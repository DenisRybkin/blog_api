import { BelongsToMany, Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../roles/roles.model";
import {UserRole} from "../../intermediate-models/user-role.model";
import { Post } from '../posts/posts.model';

export interface IUserCreateAttrs {
    email: string;
    password: string;
}

@Table({tableName: "users"})
export class User extends Model<User, IUserCreateAttrs> {

    @ApiProperty({example: "1", description: 'Uniq id'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    readonly id: number;

    @ApiProperty({example: "user@example.com", description: 'Email'})
    @Column({type: DataType.STRING, unique: true})
    email: string;

    @ApiProperty({example: "p@ssword", description: 'Password'})
    @Column({type: DataType.STRING})
    password: string;

    @ApiProperty({example: "true", description: 'User threre are banned'})
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    banned: boolean;

    @ApiProperty({example: "Syetolog", description: 'Ban Reason description'})
    @Column({type: DataType.STRING, allowNull: true})
    banReason: string;

    @BelongsToMany(() => Role, () => UserRole)
    roles: Role[];

    @HasMany(() => Post)
    posts: Post[];
}