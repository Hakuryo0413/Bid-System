import { Types } from "mongoose";

export interface accountInterface {
    _id?: Types.ObjectId,
    name?: string,
    email?: string,
    role?: string,
    address?: string,
    phone?: string,
    password?: string,
    
}