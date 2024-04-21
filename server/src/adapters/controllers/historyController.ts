import expressAsyncHandler from "express-async-handler";
import { historyDbInterface } from "../../app/repositories/historyDbRepository";
import { historyModel } from "../../frameworks/database/mongoDb/models/historyModel";
import { historyRepositoryMongoDB } from "../../frameworks/database/mongoDb/repositories/historyRepositoryMongoDB";
import { CustomRequest } from "../../types/expressRequest";
import { createHistory, findAllHistorys, findHistoryByAccount, findHistoryById, updatedHistory } from "../../app/useCases/history/history";
import { Request, Response } from "express";
import { historyInterface } from "../../types/historyInterface";
import AppError from "../../utils/appError";
import { HttpStatus } from "../../types/httpStatus";

export const historyController = (
    historyDbRepository: historyDbInterface,
    historyDbRepositoryImpl: historyRepositoryMongoDB,
    historyModel: historyModel
) => {
    const dbRepositoryHistory = historyDbRepository(historyDbRepositoryImpl(historyModel));

    const getHistoryById = expressAsyncHandler(
        async (req: Request, res: Response) => {
            const customReq = req as CustomRequest;
            const id = customReq.payload ?? "";
            const history = await findHistoryById(id, dbRepositoryHistory);
            res.json(history);
        }
    );

    const getHistoryByAccount = expressAsyncHandler(
        async (req: Request, res: Response) => {
            const { email } = req.params;
            const histories = await findHistoryByAccount(email, dbRepositoryHistory);
            res.json(histories);
        }
    );

    const getAllHistory = expressAsyncHandler(
        async (req: Request, res: Response) => {
            const histories = await findAllHistorys(dbRepositoryHistory);
            res.json(histories);
        }
    );

    const historyCreate = expressAsyncHandler(
        async (req: Request, res: Response) => {
            const history: historyInterface = req?.body;
            const token = await createHistory(history, dbRepositoryHistory);
            res.json({
                status: "success",
                message: "history created successfully",
                token
            });
        }
    )

    const updateHistory = expressAsyncHandler(
        async (req: Request, res: Response) => {
          const historyId = req.body;
          if (!historyId) {
            throw new AppError(
              "unauthorized request, invalid token",
              HttpStatus.UNAUTHORIZED
            );
          }
          const updates: historyInterface = req.body;
          const updateHistoryData = await updatedHistory(
            historyId,
            updates,
            dbRepositoryHistory
          );
    
          res.json({
            status: "success",
            updateHistoryData,
          });
        }
    ); 

    return{
        getAllHistory,
        getHistoryById,
        updateHistory,
        getHistoryByAccount,
        historyCreate
    }
}

export default historyController;
