import { notificationInterface } from "../../../types/notificationInterface";
import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";
import { notificationDbInterface } from "../../repositories/notificationDbRepository";

export const findNotificationByAccount = async (
    email: string,
    notificationRepository: ReturnType<notificationDbInterface>
) => {
    try {
        const result = await notificationRepository.getNotificationByAccount(email);
        if (!result) {
            throw new AppError("notification not found", HttpStatus.BAD_REQUEST);
        }
        return result;
    } catch (error: any) {
        console.log(error)
        throw new Error("Failed to find notification")
    }
}

export const updatedNotification = (
    id: string,
    updates: Partial<notificationInterface>,
    notificationRepository: ReturnType<notificationDbInterface>
) => {
    try {
        const notification = notificationRepository.updateNotification(id, updates);
        if (!notification) {
            throw new AppError('No notification updates', HttpStatus.UNAUTHORIZED)
        }
        return notification;
    } catch (error: any) {
        throw new Error(`error while updating the notification ${error.message}`);
    }
}

export const createNotification = (
    notification: notificationInterface,
    notificationRepository: ReturnType<notificationDbInterface>
) => {
    try {
        const newNotification = notificationRepository.createNotification(notification);
        if (!newNotification) {
            throw new AppError('created notification fail', HttpStatus.UNAUTHORIZED)
        }
        return newNotification;
    } catch (error: any) {
        throw new Error(`error while create the notification ${error.message}`);
    }
}

export const deleteNotification = async (
    id: string,
    notificationRepository: ReturnType<notificationDbInterface>
  ) => {
    try {
      await notificationRepository.deleteNotification(id);
    } catch (error) {
      throw new Error("failed to delete the notification");
    }
  };