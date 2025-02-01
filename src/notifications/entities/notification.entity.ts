import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string; // Ej: 'like', 'comment', 'follow'

  @Column()
  source_id: number; // ID del origen (post, comentario, etc.)

  @Column({ default: false })
  is_read: boolean;

  @Column()
  created_at: Date;

  // Relación
  @ManyToOne(() => User, user => user.notifications)
  user: User;
}