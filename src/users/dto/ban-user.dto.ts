import {IsNumber, IsString} from "class-validator";

export class BanUserDto {

    @IsNumber({},{message: "must be a number"})
    readonly userId: number;

    @IsString({message: "must be a string"})
    readonly banReason: string;
}