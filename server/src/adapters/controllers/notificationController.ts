import expressAsyncHandler from "express-async-handler";
import { notificationDbInterface } from "../../app/repositories/notificationDbRepository";
import { notificationModel } from "../../frameworks/database/mongoDb/models/notificationModel";
import { notificationRepositoryMongoDB } from "../../frameworks/database/mongoDb/repositories/notificationRepositoryMongoDB";
import { CustomRequest } from "../../types/expressRequest";
import { createNotification, deleteNotification, findNotificationByAccount, updatedNotification } from "../../app/useCases/notification/notification";
import { Request, Response } from "express";
import { notificationInterface } from "../../types/notificationInterface";
import AppError from "../../utils/appError";
import { HttpStatus } from "../../types/httpStatus";

export const notificationController = (
    notificationDbRepository: notificationDbInterface,
    notificationDbRepositoryImpl: notificationRepositoryMongoDB,
    notificationModel: notificationModel
) => {
    const dbRepositoryNotification = notificationDbRepository(notificationDbRepositoryImpl(notificationModel));

    const getNotificationByAccount = expressAsyncHandler(
        async (req: Request, res: Response) => {
            const { email } = req.body;
            const histories = await findNotificationByAccount(email, dbRepositoryNotification);
            res.json(histories);
        }
    );


    const notificationCreate = expressAsyncHandler(
        async (req: Request, res: Response) => {
            const notification: notificationInterface = req?.body;
            const token = await createNotification(notification, dbRepositoryNotification);
            res.json({
                status: "success",
                message: "notification created successfully",
                token
            });
        }
    )

    const updateNotification = expressAsyncHandler(
        async (req: Request, res: Response) => {
          const notificationId = req.params.id;
          if (!notificationId) {
            throw new AppError(
              "unauthorized request, invalid token",
              HttpStatus.UNAUTHORIZED
            );
          }
          const updates: notificationInterface = req.body;
          const updateNotificationData = await updatedNotification(
            notificationId,
            updates,
            dbRepositoryNotification
          );
    
          res.json({
            status: "success",
            updateNotificationData,
          });
        }
    ); 

    const deleteNotificationById = expressAsyncHandler(
        async (req: Request, res: Response) => {
            const id = req.params.id;
            await deleteNotification(id, dbRepositoryNotification);
            res.json({
                status: "success",
                message: "account deleted successfully"
            });
        }
    );

    return{
        updateNotification,
        getNotificationByAccount,
        notificationCreate,
        deleteNotificationById
    }
}

export default notificationController;
