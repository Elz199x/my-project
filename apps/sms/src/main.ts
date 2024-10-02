import { NestFactory } from '@nestjs/core';
import { SmsModule } from './sms.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(SmsModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // ลบฟิลด์ที่ไม่ได้ระบุใน DTO
      forbidNonWhitelisted: true, // ถ้ามีฟิลด์ที่ไม่ได้ระบุใน DTO จะเกิด error
      transform: true, // แปลงข้อมูล input ให้เป็น type ที่ระบุใน DTO
    }),
  );
  const config = new DocumentBuilder()
  .setTitle('API')
  .setDescription('API description')
  .setVersion('1.0')
  .addTag('sms')
  .build();
  
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api/docs', app, document);
  await app.listen(3001);
}
bootstrap();
