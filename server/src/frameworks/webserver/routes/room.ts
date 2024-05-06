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
    route.get('/room-data/email/:email' , controller.getRoomByAccount);
    route.get('/room-data/code/:code',  controller.getRoomByCode);
    route.get('/all-rooms',  controller.getAllRoom);
    route.get('/room-data/provider/:provider',controller.getRoomByProvider);
    route.get('ongoging-rooms/:date',controller.getRoomOngoing);
    route.put('/update-room',  controller.updateRoom);
    route.post('/create',  controller.roomCreate);
    route.delete('/delete/:id',controller.deleteRoomById)
    return route;
}

export default roomRoute;