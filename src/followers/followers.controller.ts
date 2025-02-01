import { Controller, Post, Body, Delete, Param } from '@nestjs/common';
import { FollowersService } from './followers.service';
import { CreateFollowerDto } from './dto/create-follower.dto';

@Controller('followers')
export class FollowersController {
  constructor(private readonly followersService: FollowersService) {}

  @Post()
  follow(@Body() createFollowerDto: CreateFollowerDto) {
    return this.followersService.follow(createFollowerDto);
  }

  @Delete(':id')
  unfollow(@Param('id') id: number) {
    return this.followersService.unfollow(id);
  }
}