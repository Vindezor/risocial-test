import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateFollowerDto {
  @IsNumber()
  @IsNotEmpty()
  followerId: number;

  @IsNumber()
  @IsNotEmpty()
  followedId: number;
}