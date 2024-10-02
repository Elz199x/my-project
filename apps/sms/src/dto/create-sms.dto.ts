import { IsString, IsNotEmpty, IsJSON, IsOptional, IsDateString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSmsDto {
    @ApiProperty({ description: 'Name' , example: 'john_doe' })
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @ApiProperty({ description: 'Email' , example: 'john.doe@example.com' })
    @IsEmail()
    email: string;
  
    @ApiProperty({ description: 'Username' , example: 'john' })
    @IsString()
    @IsNotEmpty()
    username: string;
  
    @ApiProperty({ description: 'Password' , example: 'hashe3_password_1' })
    @IsString()
    @IsNotEmpty()
    password: string;
  
    @ApiProperty({ description: 'CreatedAt' ,example: '2024-01-01T12:00:00Z' })
    @IsDateString()
    createdAt: Date;
  
    @ApiProperty({ description: 'Update' ,example: '2024-01-01T12:00:00Z' })
    @IsDateString()
    updatedAt: Date;
  }
