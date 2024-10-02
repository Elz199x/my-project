import { PrismaService } from '@app/common/prisma/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    if (createUserDto.email == null) {
      throw new HttpException(
        ' createUserDto BAD_REQUEST ',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.prisma.users.create({
      data: createUserDto,
    });
  }

  async findOne(id: number): Promise<any> {
    return await this.prisma.users.findUnique({ where: { id } });
  }

  async update(id: number, updateUserDto: CreateUserDto) {
    await this.prisma.users.update({
      where: { id },
      data: updateUserDto,
    });
    const response = await axios.put(`http://localhost:3001/sms/${id}`, {
      name: updateUserDto.name,
      email: updateUserDto.email,
      username: updateUserDto.username,
      password: updateUserDto.password,
      createdAt: updateUserDto.createdAt, 
      updatedAt: updateUserDto.updatedAt,
    });
    return response.data;
  }

  async remove(id: number): Promise<void> {
    await this.prisma.users.delete({
      where: { id },
    });
  }
}
