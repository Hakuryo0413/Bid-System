import { roomInterface } from "../../../types/roomInterface";
import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";
import { roomDbInterface } from "../../repositories/roomDbRepository";

export const findRoomByEmail = async (
    email: string,
    roomRepository: ReturnType<roomDbInterface>
) => {
    try {
        const result = await roomRepository.getRoomByEmail(email);
        if (!result) {
            throw new AppError("room not found", HttpStatus.BAD_REQUEST);
        }
        return result;
    } catch (error: any) {
        console.log(error)
        throw new Error("Failed to find room")
    }
}

export const getRoomOngoing = async (
    time: Date,
    roomRepository: ReturnType<roomDbInterface>
) => {
    try {
        const results = await roomRepository.getRoomOngoing(time);
        if (!results) {
            throw new AppError("not found", HttpStatus.BAD_REQUEST);
        }
        return results;
    } catch (error: any) {
        console.log(error)
        throw new Error("Failed to find room")
    }
}


export const findAllRooms = async (
    roomRepository: ReturnType<roomDbInterface>
) => {
    try {
        const results = await roomRepository.getAllRoom();
        if (!results) {
            throw new AppError("not found", HttpStatus.BAD_REQUEST);
        }
        return results;
    } catch (error: any) {
        console.log(error)
        throw new Error("Failed to get room")
    }
}

export const updatedRoom = (
    id: string,
    updates: Partial<roomInterface>,
    roomRepository: ReturnType<roomDbInterface>
) => {
    try {
        const room = roomRepository.updateRoom(id, updates);
        if (!room) {
            throw new AppError('No room updates', HttpStatus.UNAUTHORIZED)
        }
        return room;
    } catch (error: any) {
        throw new Error(`error while updating the room ${error.message}`);
    }
}

export const deleteRoom = async (
    id: string,
    roomRepository: ReturnType<roomDbInterface>
) => {
    try {
        await roomRepository.deleteRoom(id);
    } catch (error) {
        throw new Error("failed to delete the room");
    }
};

export const createRoom = (
    room: roomInterface,
    roomRepository: ReturnType<roomDbInterface>
) => {
    try {
        const newRoom = roomRepository.createRoom(room);
        if (!newRoom) {
            throw new AppError('created room fail', HttpStatus.UNAUTHORIZED)
        }
        return newRoom;
    } catch (error: any) {
        throw new Error(`error while create the room ${error.message}`);
    }
}

export const findRoomByCode = async (
    code: string,
    roomRepository: ReturnType<roomDbInterface>
) => {
    try {
        const results = await roomRepository.getRoomByCode(code);
        if (!results) {
            throw new AppError("not found", HttpStatus.BAD_REQUEST);
        }
        return results;
    } catch (error: any) {
        console.log(error)
        throw new Error("Failed to find room")
    }
}
