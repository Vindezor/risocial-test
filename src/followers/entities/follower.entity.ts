import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('followers')
export class Follower {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  created_at: Date;

  // Relaciones
  @ManyToOne(() => User, user => user.followers)
  follower: User;

  @ManyToOne(() => User, user => user.following)
  followed: User;
}