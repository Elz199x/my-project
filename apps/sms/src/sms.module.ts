import { Module } from '@nestjs/common';
import { SmsController } from './sms.controller';
import { SmsService } from './sms.service';
import { PrismaService } from '@app/common/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [SmsController],
  providers: [SmsService,PrismaService],
})
export class SmsModule {}
