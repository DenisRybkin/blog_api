import {Module} from '@nestjs/common';
import {RolesController} from './roles.controller';
import {RolesService} from './roles.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Role} from "./roles.model";
import {User} from "../users/users.model";
import {UserRole} from "../intermediate-models/user-role.model";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {RolesGuard} from "../auth/guards/roles.guard";

@Module({
    controllers: [RolesController],
    providers: [RolesService,JwtAuthGuard,RolesGuard],
    exports: [RolesService,JwtAuthGuard,RolesGuard],
    imports: [SequelizeModule.forFeature([Role, User, UserRole]),RolesGuard]
})
export class RolesModule {
}
