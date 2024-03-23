import { Date, Types } from "mongoose";

export interface roomInterface {
    _id?: Types.ObjectId,
    code?: string,
    participants?: string[],
    start_at?: Date,
    time_limit?: number,
    phone?: string,
    password?: string,
}