import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type CustomerDocument = HydratedDocument<Customer>

@Schema()
export class Customer {
    @Prop()
    id: number

    @Prop()
    name: string

    @Prop()
    phone: string

    @Prop()
    address: string
}

export const CustomerSchema = SchemaFactory.createForClass(Customer)
