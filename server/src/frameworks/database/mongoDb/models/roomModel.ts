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
    provider:{
        type: String
    },
    state:{
        type: String
    },
    time_limit:{
        type: Number
    },
    price:{
        type: Number
    },
    created_at:{
        type: Date,
        default: Date.now()
    },
    phone:{
        type: String
    
    }
    
})

export const Room = model("Room",roomSchema,"room")
export type roomModel = typeof Room;