// เป็นไฟล์หลักของ app
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  // เชื่อม mongo
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://devtoeii:devtoeii@cluster0.bids7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    ),
    CustomerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
// eslint-disable-next-line prettier/prettier
export class AppModule { }
