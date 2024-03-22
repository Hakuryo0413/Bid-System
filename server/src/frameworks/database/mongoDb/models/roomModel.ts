import { Schema, model } from "mongoose";

const roomSchema = new Schema({
    code:{
        type: String
    },
    participants:{
        type: Array
    },
    Start_at:{
        type:Date
    },
    time_limit:{
        type: Number
    },
    price:{
        type: Number
    },
    provider:{
        type: String
    },
    created_at:{
        type: Date
    }
    
})

export const Room = model("Room",roomSchema)
export type roomModel = typeof Room;