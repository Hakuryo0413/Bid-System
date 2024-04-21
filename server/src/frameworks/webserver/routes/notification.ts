import express from "express";
import roleMiddleware from "../middleware/roleMiddleware";
import notificationController from "../../../adapters/controllers/notificationController";
import { notificationDbRepository } from "../../../app/repositories/notificationDbRepository";
import { notificationRepositoryMongoDB } from "../../database/mongoDb/repositories/notificationRepositoryMongoDB";
import { Notification } from "../../database/mongoDb/models/notificationModel";
import authenticationMiddleware from "../middleware/authenticationMiddleware";


const notificationRoute = () => {
    const route = express.Router();

    const controller = notificationController(
        notificationDbRepository,
        notificationRepositoryMongoDB,
        Notification
    );
    route.get('/notification-data/email/:email', authenticationMiddleware, controller.getNotificationByAccount);
    route.put('/update-notification/:id', authenticationMiddleware,  controller.updateNotification);
    route.post('/create',  controller.notificationCreate);
    route.delete('/delete',authenticationMiddleware,controller.deleteNotificationById);
    return route;
}

export default notificationRoute;