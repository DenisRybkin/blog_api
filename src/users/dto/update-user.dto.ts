import {ApiProperty} from "@nestjs/swagger";

export class UpdateUserDto {

    @ApiProperty({example: "user@example.com", description: 'Email'})
    readonly email: string;

    @ApiProperty({example: "p@ssword", description: 'Password'})
    readonly password: string;
}