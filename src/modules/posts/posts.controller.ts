import {
  Body,
  Controller, Delete,
  Get,
  Param,
  ParseIntPipe,
  Post, Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
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
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {

  constructor(private postService: PostsService) {
  }

  @ApiOperation({summary: "Getting posts"})
  @ApiResponse({status: 200, type: [Post]})
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.postService.getAll()
  }

  @ApiOperation({summary: "Getting post by id"})
  @ApiResponse({status: 200, type: Post})
  @UseGuards(JwtAuthGuard)
  @Get("/:id")
  getById(@Param('id',ParseIntPipe) id: number) {
    return this.postService.getById(id);
  }

  @ApiOperation({summary: "Adding post"})
  @ApiResponse({status: 200, type: Post})
  @Roles(RoleKeys.ADMIN)
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

  @ApiOperation({summary: "Updating post"})
  @ApiResponse({status: 200, type: Post})
  @Roles(RoleKeys.ADMIN)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Put("/:id")
  @UseInterceptors(FileInterceptor('image'))
  update(
    @Param("id",ParseIntPipe) id: number,
    @Body() postDto: UpdatePostDto
  ) {
    return this.postService.update(id, postDto);
  }

  @ApiOperation({summary: "Adding post"})
  @ApiResponse({status: 200, type: Post})
  @Roles(RoleKeys.ADMIN)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Delete("/:id")
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.postService.remove(id)
  }
}
