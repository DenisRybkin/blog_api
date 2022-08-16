import {ApiProperty} from "@nestjs/swagger";

export class CreateRoleDto {

    @ApiProperty({example: "syetolog", description: "Value of user role"})
    readonly value: string;

    @ApiProperty({example: "He is syetolog", description: "Description of user role"})
    readonly description: string;

}