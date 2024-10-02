import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { SmsService } from './sms.service';
import { CreateSmsDto } from './dto/create-sms.dto';

@Controller('sms')
export class SmsController {
  constructor(private readonly smsService: SmsService) {}

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() createSmsDto: CreateSmsDto,
  ) {
    return this.smsService.update(+id, createSmsDto)
  }
}
