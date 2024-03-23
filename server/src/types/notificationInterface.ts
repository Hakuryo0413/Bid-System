import { Date, Types } from "mongoose";

export interface notificationInterface {
    _id?: Types.ObjectId,
    account?: string,
    content?: string,
    from?: string,
    state?: boolean,
    created_at?: Date
}