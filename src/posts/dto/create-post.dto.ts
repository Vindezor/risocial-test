import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class CreatePostDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsOptional()
  image_url?: string;
}