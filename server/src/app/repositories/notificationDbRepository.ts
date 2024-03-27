import { type } from "os";
import { notificationRepositoryMongoDB } from "../../frameworks/database/mongoDb/repositories/notificationRepositoryMongoDB";
import { notificationInterface } from "../../types/notificationInterface";

export const notificationDbRepository = (
    repository: ReturnType<notificationRepositoryMongoDB>
) => {
    const getNotificationByAccount = async (email: string) => {
        const notification = await repository.getNotificationByAccount(email);
        return notification;
    }
    const createNotification = async (notification: notificationInterface) => {
        const newNotification = await repository.createNotification(notification);
        return newNotification;
    }
    const updateNotification = async (id: string, updates: Partial<notificationInterface>) => {
        const updatedNotification = await repository.updateNotification(id, updates);
        return updatedNotification;
    }

    const deleteNotification = async (id: string)=>{
        await repository.deleteNotification(id);
    }


    return {
        getNotificationByAccount,
        createNotification,
        updateNotification,
        deleteNotification
    }
}

export type notificationDbInterface = typeof notificationDbRepository;