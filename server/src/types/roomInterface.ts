import { Date, Types } from "mongoose";


interface UserPrice {
    account?: string; 
    price?: number; 
}

export interface roomInterface {
    _id?: Types.ObjectId,
    code?: string,
    participants?: UserPrice[],
    start_at?: Date,
    time_limit?: number,
    price?:number,
    phone?: string,
    password?: string,
    create_at?: Date,
}