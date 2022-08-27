import {Module} from '@nestjs/common';
import {RolesController} from './roles.controller';
import {RolesService} from './roles.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Role} from "./roles.model";
import {UserRole} from "../../intermediate-models/user-role.model";
import { AuthModule } from '../auth/auth.module';
import { User } from '../users/users.model';

@Module({
    controllers: [RolesController],
    providers: [RolesService],
    exports: [RolesService],
    imports: [
      AuthModule,
      SequelizeModule.forFeature([Role, User, UserRole])
    ]
})
export class RolesModule {
}
