import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as PostEntity } from './entities/post.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() createPostDto: { userId: number; content: string; image_url?: string }) {
    return this.postsService.create(createPostDto.userId, createPostDto.content, createPostDto.image_url);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.postsService.findOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.postsService.delete(id);
  }
}