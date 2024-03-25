import { notificationEntity } from "../../../../entities/notificationEntity";
import { notificationModel } from "../models/notificationModel";
import { notificationInterface } from "../../../../types/notificationInterface";

export const notificationRepositoryMongoDB = (model: notificationModel) =>{
    const NotificationEntity = new notificationEntity(model);
    
    const getNotificationByAccount = async (email: string) =>{
        const notification = await NotificationEntity.getNotificationByAccount(email);
        return notification;
    }

    const createNotification = async (notification : notificationInterface) =>{
        const newNotification = await NotificationEntity.createNotification(notification);
        return newNotification;
    }

    const updateNotification = async (id: string, updates: Partial<notificationInterface>) =>{
        const updatedNotification = await NotificationEntity.updateNotification(id,updates);
        return updatedNotification;
    }

    return{
        createNotification,
        updateNotification,
        getNotificationByAccount
    }
}

export type notificationRepositoryMongoDB = typeof notificationRepositoryMongoDB;