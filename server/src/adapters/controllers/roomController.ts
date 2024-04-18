import expressAsyncHandler from "express-async-handler";
import { roomDbInterface } from "../../app/repositories/roomDbRepository";
import { roomModel } from "../../frameworks/database/mongoDb/models/roomModel";
import { roomRepositoryMongoDB } from "../../frameworks/database/mongoDb/repositories/roomRepositoryMongoDB";
import { CustomRequest } from "../../types/expressRequest";
import { createRoom, deleteRoom, findAllRooms, findRoomByAccount, findRoomByCode, findRoomOngoing, updatedRoom } from "../../app/useCases/room/room";
import { Request, Response } from "express";
import { roomInterface } from "../../types/roomInterface";
import AppError from "../../utils/appError";
import { HttpStatus } from "../../types/httpStatus";

export const roomController = (
    roomDbRepository: roomDbInterface,
    roomDbRepositoryImpl: roomRepositoryMongoDB,
    roomModel: roomModel
) => {
    const dbRepositoryRoom = roomDbRepository(roomDbRepositoryImpl(roomModel));

    const getRoomByCode = expressAsyncHandler(
        async (req: Request, res: Response) => {
            const { code } = req.params;
            console.log(code)
            const rooms = await findRoomByCode(code, dbRepositoryRoom);
            res.json(rooms);
        }
    );

    const getRoomByAccount = expressAsyncHandler(
        async (req: Request, res: Response) => {
            const { email } = req.params;
            const rooms = await findRoomByAccount(email, dbRepositoryRoom);
            res.json(rooms);
        }
    );

    const getAllRoom = expressAsyncHandler(
        async (req: Request, res: Response) => {
            const rooms = await findAllRooms(dbRepositoryRoom);
            res.json(rooms);
        }
    )

    const getRoomOngoing = expressAsyncHandler(
        async (req: Request, res: Response) => {
            const { date } = req.body;
            const rooms = await findRoomOngoing(date, dbRepositoryRoom);
            res.json(rooms);
        }
    ); 

    const roomCreate = expressAsyncHandler(
        async (req: Request, res: Response) => {
            const room: roomInterface = req?.body;
            const token = await createRoom(room, dbRepositoryRoom);
            res.json({
                status: "success",
                message: "room created successfully",
                token
            });
        }
    )

    const updateRoom = expressAsyncHandler(
        async (req: Request, res: Response) => {
          const customReq = req as CustomRequest;
          const roomId = customReq.body ?? "";
          console.log(customReq.body)
          if (!roomId) {
            throw new AppError(
              "unauthorized request, invalid token",
              HttpStatus.UNAUTHORIZED
            );
          }
          const updates: roomInterface = req.body;
          const updateRoomData = await updatedRoom(
            roomId,
            updates,
            dbRepositoryRoom
          );
    
          res.json({
            status: "success",
            updateRoomData,
          });
        }
    ); 

    const deleteRoomById = expressAsyncHandler(
        async (req: Request, res: Response) => {
            const id = req.params.id;
            await deleteRoom(id, dbRepositoryRoom);
            res.json({
                status: "success",
                message: "account deleted successfully"
            });
        }
    );

    return{
        getRoomByCode,
        getRoomByAccount,
        getAllRoom,
        getRoomOngoing,
        roomCreate,
        updateRoom,
        deleteRoomById,
    }
}

export default roomController;
