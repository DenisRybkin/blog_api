import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import {ApiProperty} from "@nestjs/swagger";
import { User } from '../users/users.model';

export interface IPostCreateAttrs {
  title: string;
  content: string;
  userId: number;
  image: string;
}

@Table({tableName: "posts"})
export class Post extends Model<Post, IPostCreateAttrs> {

  @ApiProperty({example: "1", description: 'Uniq id'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  readonly id: number;

  @ApiProperty({example: "Post about my 'large' experience", description: 'Title'})
  @Column({type: DataType.STRING,allowNull: false})
  title: string;

  @ApiProperty({example: "I'm very very cool, believe me", description: 'Content'})
  @Column({type: DataType.STRING,allowNull: false})
  content: string;


  @ApiProperty({example: "https://sun9-69.userapi.com/impg/2xkMGMhg8h8eJz4pt7pGjLCebEUN5G4muwPsCA/EUOV1Jc-3ik.jpg?size=1280x917&quality=95&sign=1a65f0a2cb111d17029a623ddddbad4c&type=album", description: 'url to image'})
  @Column({type: DataType.STRING,allowNull: true})
  image: string;

  @ApiProperty({example: "1", description: 'Foreign key'})
  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER})
  userId: number

  @BelongsTo(() => User)
  author: User
}