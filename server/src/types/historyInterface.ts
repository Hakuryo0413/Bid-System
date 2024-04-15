import { Date, Types } from "mongoose";

export interface historyInterface {
    _id?: Types.ObjectId,
    sim?: string,
    room?: string,
    account?: string,
    state?: string, 
    created_at?: Date
}