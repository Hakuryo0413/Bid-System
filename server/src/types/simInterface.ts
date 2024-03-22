import { Date, Types } from "mongoose";

export interface historyInterface {
    _id?: Types.ObjectId,
    number?: string,
    provider?: string,
    start_at?: Date,
    time_limit?: number,
    starting_price?: number,
    last_price?: number,
    created_at?: Date
}