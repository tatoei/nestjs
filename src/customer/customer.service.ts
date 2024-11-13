/* eslint-disable prettier/prettier */
// เรียกใช้ฟังก์ชันต่าง ๆ ที่ทำงานกับข้อมูลโดยตรง และส่งผลลัพธ์ต่อไปยัง Controller เพื่อแสดงผลแก่ผู้ใช้
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CustomerDTO } from 'src/dto/customer.dto';
import { Customer, CustomerDocument } from './schema/customer.schema';
import { Model } from 'mongoose';

@Injectable()
export class CustomerService {
    // นำเข้าจาก schema
    constructor(
        @InjectModel(Customer.name)
        private CustomerModel: Model<CustomerDocument>
    ) { }

    // Create a new customer
    // สร้างลูกค้าใหม่ด้วย ID ที่ไม่ซ้ำกัน (โดยการหาค่า ID ที่มากที่สุดและเพิ่มขึ้น 1)
    async create(customer: CustomerDTO): Promise<CustomerDTO> {
        const count = await this.CustomerModel.countDocuments();
        const newId = count + 1;  // เพิ่มIDทีละ 1
        const newCustomer = new this.CustomerModel({
            id: newId,
            ...customer
        });
        const savedCustomer = await newCustomer.save();

        return savedCustomer


    }

    // Find all customers
    // ดึงข้อมูลลูกค้าทั้งหมดในระบบที่อยู่ใน this.CustomerModal
    async findAll(): Promise<CustomerDTO[]> {
        return await this.CustomerModel.find().exec();
    }

    // Find customer by ID
    // ค้นหาและคืนค่าข้อมูลลูกค้าที่มี ID ตรงกับพารามิเตอร์ id ที่ระบุ
    async findById(id: number): Promise<CustomerDTO | null> {
        return await this.CustomerModel.findOne({ id }).exec();
    }

    // Find customers by a specific condition
    // ฟังก์ชัน findByCondition ใช้เพื่อกรองข้อมูลลูกค้าใน this.CustomerModal ตามเงื่อนไขที่กำหนดผ่านฟังก์ชัน predicate
    async findByCondition(
        predicate: (customer: CustomerDTO) => boolean,
    ): Promise<CustomerDTO[]> {
        const customers = await this.CustomerModel.find().exec();
        return customers.filter(predicate);
    }

    // Update customer by ID
    // ฟังก์ชัน update จะค้นหาลูกค้าในฐานข้อมูลตาม id ที่ระบุ
    async update(id: number, updatedCustomerDTO: CustomerDTO): Promise<CustomerDTO> {
        const customer = await this.CustomerModel.findOneAndUpdate(
            { id },
            { $set: updatedCustomerDTO },
            { new: true }
        ).exec();

        if (!customer) {
            throw new ConflictException('Customer not found');
        }

        return customer;
    }

    // Delete customer by ID
    // ฟังก์ชัน delete จะค้นหาลูกค้าในฐานข้อมูลตาม id ที่ระบุ
    async delete(id: number): Promise<CustomerDTO> {
        const deletedCustomer = await this.CustomerModel.findOneAndDelete({ id }).exec();

        if (!deletedCustomer) {

            throw new ConflictException('Customer not found');
        }

        return deletedCustomer;
    }
}
