import { Date, Types } from "mongoose";


export interface ParticipantInterface {
    _id?: string,
    name: string,
    email: string,
    phone: string,
    highest_price: number,
    status: string,
    
}

export interface roomInterface {
    _id?: Types.ObjectId,
    code?: string,
    participants?: ParticipantInterface[],
    Start_at?: Date,
    time_limit?: number,
    provider?: string,
    price?:number,
    phone?: string,
    state?: string,
    create_at?: Date,
}