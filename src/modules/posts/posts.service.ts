import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './posts.model';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from '../files/files.service';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {


  constructor(@InjectModel(Post) private postRepository: typeof Post,
              private fileService: FilesService) {}

  async getAll(): Promise<Post[] | undefined> {
    return this.postRepository.findAll({include: {all: true}})
  }

  async getById(id: number): Promise<Post | undefined> {
    return this.postRepository.findByPk(id);
  }

   async create (dto: CreatePostDto,userId: number,image: any) {
      const fileName = image ? await this.fileService.createFile(image) : undefined;
      return await this.postRepository.create({...dto,userId,image: fileName});
  }

  async update(id: number,dto:UpdatePostDto) {
    return await this.postRepository.update(
      {...dto},
      {where: {id}})
  }

  async remove(id:number): Promise<number | undefined> {
    return await this.postRepository.destroy({where: {id}})
  }
}
