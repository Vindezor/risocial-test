import { Controller, Post, Body, Delete, Param } from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post()
  create(@Body() createLikeDto: CreateLikeDto) {
    return this.likesService.create(createLikeDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.likesService.delete(id);
  }
}