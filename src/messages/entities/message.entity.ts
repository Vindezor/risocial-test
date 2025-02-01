import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  content: string;

  @Column({ default: false })
  is_read: boolean;

  @Column()
  created_at: Date;

  // Relaciones
  @ManyToOne(() => User, user => user.sentMessages)
  sender: User;

  @ManyToOne(() => User, user => user.receivedMessages)
  receiver: User;
}