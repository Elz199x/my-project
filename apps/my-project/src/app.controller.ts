import { Body, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { ResponseInterceptor } from '@app/common/intercrptor/response.interceptor';
import { CreateUserDto } from './dto/create-user.dto';

@UseInterceptors(ResponseInterceptor)
@ApiTags('users')
@Controller('users')
export class AppController {
  constructor(private readonly appService: AppService) {}


  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.appService.create(createUserDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() createUserDto: CreateUserDto,
 
  ) {
    return this.appService.update(+id, createUserDto)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appService.remove(+id);
  }
}
