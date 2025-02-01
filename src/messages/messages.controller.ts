import { Controller, Post, Body, Get, Delete, Param } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  sendMessage(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.sendMessage(createMessageDto);
  }

  @Get(':userId')
  getMessages(@Param('userId') userId: number) {
    return this.messagesService.getMessages(userId);
  }

  @Delete(':id')
  deleteMessage(@Param('id') id: number) {
    return this.messagesService.deleteMessage(id);
  }
}