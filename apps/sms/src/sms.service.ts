import { PrismaService } from '@app/common/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Sms } from './sms.type';
import { CreateSmsDto } from './dto/create-sms.dto';

@Injectable()
export class SmsService {
  constructor(private prisma: PrismaService) {}
  getHello(): string {
    return 'Hello World!';
  }

  async update(id: number, createSmsDto: CreateSmsDto) {
    const data: Sms = {
      username: createSmsDto.username,
      action: 'update',
      data: createSmsDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    console.log('update', id, createSmsDto);
    await this.prisma.sms.create({
      data: data,
    });
    return data
  }
}
