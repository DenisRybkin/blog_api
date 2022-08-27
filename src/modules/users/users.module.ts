import {forwardRef, Module} from '@nestjs/common';
import {UsersController} from './users.controller';
import {UsersService} from './users.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./users.model";
import {Role} from "../roles/roles.model";
import {UserRole} from "../../intermediate-models/user-role.model";
import {RolesModule} from "../roles/roles.module";
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';
import { Post } from '../posts/posts.model';

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [
        SequelizeModule.forFeature([User, Role, UserRole,Post]),
        RolesModule,
        forwardRef(() => AuthModule)
    ],
    exports: [UsersService]
})
export class UsersModule {
};
