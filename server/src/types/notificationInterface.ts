import { Date, Types } from "mongoose";

export interface accountInterface {
    _id?: Types.ObjectId,
    account?: string,
    content?: string,
    from?: string,
    state?: boolean,
    created_at?: Date
}