import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {SequelizeModule} from "@nestjs/sequelize";
import {UsersModule} from './modules/users/users.module';
import {User} from "./modules/users/users.model";
import {RolesModule} from './modules/roles/roles.module';
import {Role} from "./modules/roles/roles.model";
import {UserRole} from "./intermediate-models/user-role.model";
import { AuthModule } from './auth/auth.module';
import {PostsModule} from "./modules/posts/posts.module"
import { Post } from './modules/posts/posts.model';
import { FilesModule } from './modules/files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        ServeStaticModule.forRoot({
            rootPath: resolve(__dirname, 'static'),
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User, Role, UserRole, Post],
            autoLoadModels: true
        }), UsersModule, RolesModule, AuthModule,PostsModule, FilesModule],
    controllers: [],
    exports: [],
    providers: []
})
export class AppModule {
}
