import { Date, Types } from "mongoose";


interface UserPrice {
    account?: string; 
    price?: number; 
}

export interface roomInterface {
    _id?: Types.ObjectId,
    code?: string,
    participants?: UserPrice[],
    user_highes_price?: string,
    start_at?: Date,
    time_limit?: number,
    phone?: string,
    password?: string,
}