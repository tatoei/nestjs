/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";

export class CustomerBody {
    @ApiProperty()
    name: string
    phone: string
    addres: string
}