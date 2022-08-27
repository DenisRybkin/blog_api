import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/users.model';
import { Role } from '../roles/roles.model';
import { UserRole } from '../../intermediate-models/user-role.model';
import { Post } from './posts.model';
import { AuthModule } from '../auth/auth.module';
import { FilesModule } from '../files/files.module';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [
    FilesModule,
    AuthModule,
    SequelizeModule.forFeature([User,Post]),
  ]
})
export class PostsModule {}
