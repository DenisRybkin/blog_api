import { Body, Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from '../users/users.model';
import { Roles } from '../../decorators/roles-auth.decorator';
import { RoleKeys } from '../../constants/role-keys';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { getRequest } from '../../decorators/getRequest.decorator';
import { UserIdPipe } from '../../pipes/userId.pipe';
import { PostsService } from './posts.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('posts')
export class PostsController {

  constructor(private postService: PostsService) {
  }

  @ApiOperation({summary: "Adding post"})
  @ApiResponse({status: 200, type: Post})
  @Roles(RoleKeys.USER)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() dto : CreatePostDto,
    @UploadedFile() image,
    @getRequest(new UserIdPipe()) userId: number
  ) {
    return this.postService.create(dto,userId,image)
  }
}
