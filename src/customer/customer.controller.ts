/* eslint-disable prettier/prettier */
// เป็นไฟล์ที่จัดการคำขอทั้งหมดและจะส่งการตอบรับไปยังผู้ใช้
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { CustomerDTO } from 'src/dto/customer.dto';
import { CustomerService } from './customer.service';
import { ApiBody } from '@nestjs/swagger';
import { CustomerBody } from 'src/models/customer.model';

// กำหนด path API ให้ Auto
@Controller('customer')
export class CustomerController {
    constructor(private customerService: CustomerService) { }

    // ฟังก์ชันนี้ใช้สำหรับดึงข้อมูลลูกค้าเฉพาะที่ตรงกับ query string
    @Get()
    async getCustomerAll(): Promise<CustomerDTO[]> {
        // if (customerName) {
        //     return this.customerService.findByCondition((customer) =>
        //         customer.name.includes(customerName),
        //     );
        // }
        return this.customerService.findAll();
    }

    // ฟังก์ชันนี้จะใช้ดึงข้อมูลลูกค้าตาม id
    @Get(':id')
    async getCustomerById(@Param('id') id: string): Promise<CustomerDTO> {
        return this.customerService.findById(Number(id));
    }

    // ฟังก์ชันนี้ใช้สำหรับเพิ่มข้อมูลลูกค้าใหม่
    @Post()
    @ApiBody({ type: CustomerBody })
    async addCustomer(@Body() customer: CustomerDTO): Promise<CustomerDTO> {

        console.log('Controller:', customer);
        return this.customerService.create(customer);

    }

    // ฟังก์ชันนี้ใช้สำหรับอัปเดตข้อมูลลูกค้าตาม id
    @Put(':id')
    async updateCustomer(@Param('id') id: string, @Body() customer: CustomerDTO): Promise<CustomerDTO> {
        return this.customerService.update(Number(id), customer);
    }

    // ฟังก์ชันนี้ใช้สำหรับลบข้อมูลลูกค้าตาม id
    @Delete(':id')
    async deleteCustomer(@Param('id') id: string): Promise<CustomerDTO> {
        return this.customerService.delete(Number(id));
    }
}
