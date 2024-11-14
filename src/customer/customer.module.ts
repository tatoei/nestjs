import { Module } from '@nestjs/common'
import { CustomerController } from './customer.controller'
import { CustomerService } from './customer.service'
import { MongooseModule } from '@nestjs/mongoose'
import { Customer, CustomerSchema } from './schema/customer.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
    ]),
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
})
// eslint-disable-next-line prettier/prettier
export class CustomerModule { }
