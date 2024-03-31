import { ObjectId } from "mongodb";
import { Schema, model } from "mongoose";

const simSchema = new Schema({
    number:{
        type: String
    },
    provider:{
        type: String
    },
    start_at:{
        type:Date
    },
    time_limit:{
        type: Number
    },
    starting_price:{
        type: Number
    },
    last_price:{
        type: Number
    },
    created_at:{
        type: Date,
        default: Date.now()
    }
    
})

export const Sim = model("Sim",simSchema,"sim")
export type simModel = typeof Sim;