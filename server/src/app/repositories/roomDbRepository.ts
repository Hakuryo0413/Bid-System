import { type } from "os";
import { roomRepositoryMongoDB } from "../../frameworks/database/mongoDb/repositories/roomRepositoryMongoDB";
import { roomInterface } from "../../types/roomInterface";

export const roomDbRepository = (
    repository: ReturnType<roomRepositoryMongoDB>
) => {
    const getRoomByCode = async (code: string) => {
        const room = await repository.getRoomByCode(code);
        return room;
    }
    const getRoomByAccount = async (email: string) => {
        const room = await repository.getRoomByAccount(email);
        return room;
    }
    const getRoomByProvider = async (email: string) =>{
        const rooms = await repository.getRoomByProvider(email);
        return rooms;
    }
    const createRoom = async (room: roomInterface) => {
        const newRoom = await repository.createRoom(room);
        return newRoom;
    }
    const updateRoom = async (id: string, updates: Partial<roomInterface>) => {
        const updatedRoom = await repository.updateRoom(id, updates);
        return updatedRoom;
    }
    const deleteRoom = async (id: string)=>{
        await repository.deleteRoom(id);
    }
    const getAllRoom = async() =>{
        const allRooms = await repository.getAllRoom();
        return allRooms;
    }
    const getRoomOngoing = async(time :Date)=>{
        const rooms = await repository.getRoomOngoing(time);
        return rooms;
    }

    return {
        getRoomByCode,
        getRoomByAccount,
        getRoomByProvider,
        createRoom,
        updateRoom,
        deleteRoom,
        getAllRoom,
        getRoomOngoing
    }
}

export type roomDbInterface = typeof roomDbRepository;