import { roomEntity } from "../../../../entities/roomEntity";
import { roomModel } from "../models/roomModel";
import { roomInterface } from "../../../../types/roomInterface";

export const roomRepositoryMongoDB = (model: roomModel) =>{
    const RoomEntity = new roomEntity(model);
    
    const getRoomByCode = async (code: string) =>{
        const room = await RoomEntity.getRoomByCode(code);
        return room;
    }

    const getRoomByEmail = async (email: string) =>{
        const room = await RoomEntity.getRoomByEmail(email);
        return room;
    }

    const createRoom = async (room : roomInterface) =>{
        const newRoom = await RoomEntity.createRoom(room);
        return newRoom;
    }

    const updateRoom = async (id: string, updates: Partial<roomInterface>) =>{
        const updatedRoom = await RoomEntity.updateRoom(id,updates);
        return updatedRoom;
    }

    const getAllRoom = async() =>{
        const allRooms = await RoomEntity.getAllRoom();
        return allRooms;
    }

    const getRoomOngoing = async(time :Date)=>{
        const rooms = await RoomEntity.getRoomOngoing(time);
        return rooms;
    }

    const deleteRoom = async(id: string) =>{
        await RoomEntity.deleteRoom(id);
    }

    return{
        getRoomByCode,
        getRoomByEmail,
        createRoom,
        updateRoom,
        getAllRoom,
        getRoomOngoing,
        deleteRoom
    }
}

export type roomRepositoryMongoDB = typeof roomRepositoryMongoDB;