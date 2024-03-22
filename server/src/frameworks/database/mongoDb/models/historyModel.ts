import { ObjectId } from "mongodb";
import { Schema, model } from "mongoose";

const historySchema = new Schema({
    sim:{
        type: String
    },
    room:{
        type: String
    },
    account:{
        type: String
    },
    state:{
        type: String
    },
    created_at:{
        type: Date
    }
    
})

export const History = model("History",historySchema)
export type HistoryModel = typeof History;