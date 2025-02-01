import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Notification } from './entities/notification.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createNotificationDto: CreateNotificationDto): Promise<Notification> {
    const user = await this.userRepository.findOne({ where: { id: createNotificationDto.userId } });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    const notification = this.notificationRepository.create({
      type: createNotificationDto.type,
      source_id: createNotificationDto.sourceId,
      user,
    });

    return this.notificationRepository.save(notification);
  }

  async getUserNotifications(userId: number): Promise<Notification[]> {
    return this.notificationRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }

  async markAsRead(id: number): Promise<Notification> {
    const notification = await this.notificationRepository.findOne({ where: { id } });
    if (!notification) throw new NotFoundException('Notificación no encontrada');

    notification.is_read = true;
    return this.notificationRepository.save(notification);
  }
}