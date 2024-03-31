import express from "express";
import roleMiddleware from "../middleware/roleMiddleware";
import roomController from "../../../adapters/controllers/roomController";
import { roomDbRepository } from "../../../app/repositories/roomDbRepository";
import { roomRepositoryMongoDB } from "../../database/mongoDb/repositories/roomRepositoryMongoDB";
import { Room } from "../../database/mongoDb/models/roomModel";
import authenticationMiddleware from "../middleware/authenticationMiddleware";


const roomRoute = () => {
    const route = express.Router();

    const controller = roomController(
        roomDbRepository,
        roomRepositoryMongoDB,
        Room
    );
    route.get('/room-data/email/:email', authenticationMiddleware, controller.getRoomByAccount);
    route.get('/room-data/code/:code', authenticationMiddleware,  controller.getRoomByCode);
    route.get('/all-rooms', authenticationMiddleware,  controller.getAllRoom);
    route.get('ongoging-rooms/:date',authenticationMiddleware,controller.getRoomOngoing);
    route.patch('/update-room/:id', authenticationMiddleware,  controller.updateRoom);
    route.post('/create', authenticationMiddleware,  controller.roomCreate);
    route.delete('/delete/:id',authenticationMiddleware,controller.deleteRoomById)
    return route;
}

export default roomRoute;