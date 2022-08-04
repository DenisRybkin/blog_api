import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length} from "class-validator";

export class UpdateUserDto {

    @ApiProperty({example: "user@example.com", description: 'Email'})
    @IsString({message: "must be a string"})
    @IsEmail({}, {message: "Incorrect the email"})
    readonly email: string;

    @ApiProperty({example: "p@ssword", description: 'Password'})
    @IsString({message: "must be a string"})
    @Length(4,16, {message: "not less than 4 not more than 16"})
    readonly password: string;
}