// เป็นไฟล์ที่ใช้เขียน API ส่ง req Get Post put delete ส่งมาและจะให้ทำอะไรบ้าง
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  // req method get ส่งมาที่ nestjs
  @Get()
  getHello(): string {
    // จะ response กลับไปในบรรทัดนี้
    // return ข้อความ Hello World ใน getHello
    return this.appService.getHello();
  }
}
