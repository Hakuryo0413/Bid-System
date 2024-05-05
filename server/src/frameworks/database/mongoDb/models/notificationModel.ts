import { ObjectId } from "mongodb";
import { Schema, model } from "mongoose";

const notificationSchema = new Schema({
    account:{
        type: String
    },
    content:{
        type: String
    },
    from:{
        type: String
    },
    state:{
        type: Boolean
    },
    type:{
        type: String
    },
    created_at:{
        type: Date,
        default: Date.now()
    }
    
})

export const Notification = model("Notification",notificationSchema,"notification")
export type notificationModel = typeof Notification;