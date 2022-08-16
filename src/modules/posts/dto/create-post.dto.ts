import { IsNumber, IsString, Length } from 'class-validator';

export class CreatePostDto {

  @IsString({message: "must be a string"})
  @Length(3,21, {message: "not less than 3 not more than 21"})
  readonly title: string;

  @IsString({message: "must be a string"})
  @Length(3,21, {message: "not less than 3 not more than 21"})
  readonly content: string;

  @IsNumber({allowNaN: false}, {message: "must be a number"})
  readonly userId: number;
}