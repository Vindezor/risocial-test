import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(createNotificationDto);
  }

  @Get(':userId')
  getUserNotifications(@Param('userId') userId: number) {
    return this.notificationsService.getUserNotifications(userId);
  }

  @Patch(':id/mark-as-read')
  markAsRead(@Param('id') id: number) {
    return this.notificationsService.markAsRead(id);
  }
}