import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  postId: number;

  @IsString()
  @IsNotEmpty()
  content: string;
}