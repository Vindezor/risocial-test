import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post() // Endpoint POST /users
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() userData: Partial<User>): Promise<User> {
    return this.usersService.update(id, userData);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.usersService.remove(id);
  }
}