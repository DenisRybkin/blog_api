import { IsString, Length } from 'class-validator';

export class UpdatePostDto {

  @IsString({message: "must be a string"})
  @Length(3,21, {message: "not less than 3 not more than 21"})
  readonly title: string;

  @IsString({message: "must be a string"})
  @Length(3,21, {message: "not less than 3 not more than 21"})
  readonly content: string;
}