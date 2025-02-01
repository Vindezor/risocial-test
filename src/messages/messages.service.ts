import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async sendMessage(createMessageDto: CreateMessageDto): Promise<Message> {
    const sender = await this.userRepository.findOne({ where: { id: createMessageDto.senderId } });
    const receiver = await this.userRepository.findOne({ where: { id: createMessageDto.receiverId } });

    if (!sender || !receiver) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const message = this.messageRepository.create({
      content: createMessageDto.content,
      sender,
      receiver,
    });

    return this.messageRepository.save(message);
  }

  async getMessages(userId: number): Promise<Message[]> {
    return this.messageRepository.find({
      where: [{ sender: { id: userId } }, { receiver: { id: userId } }],
      relations: ['sender', 'receiver'],
    });
  }

  async deleteMessage(id: number): Promise<void> {
    await this.messageRepository.delete(id);
  }
}