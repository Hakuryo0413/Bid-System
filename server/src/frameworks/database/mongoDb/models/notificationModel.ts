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
    created_at:{
        type: Date,
        default: Date.now()
    }
    
})

export const Notification = model("Notification",notificationSchema)
export type NotificationModel = typeof Notification;