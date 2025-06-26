import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  contactInfo?: string;

  @IsString()
  @IsOptional()
  role?: string;

  @IsString()
  @IsNotEmpty()
  departmentId: string; // Added to specify which department the user belongs to
}
