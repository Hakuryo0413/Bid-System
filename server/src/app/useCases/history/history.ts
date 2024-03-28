import { historyInterface } from "../../../types/historyInterface";
import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";
import { historyDbInterface } from "../../repositories/historyDbRepository";

export const findHistoryByAccount = async (
    email: string,
    historyRepository: ReturnType<historyDbInterface>
) => {
    try {
        const result = await historyRepository.getHistoryByAccount(email);
        if (!result) {
            throw new AppError("history not found", HttpStatus.BAD_REQUEST);
        }
        return result;
    } catch (error: any) {
        console.log(error)
        throw new Error("Failed to find history")
    }
}


export const findHistoryById = async (
    id: string,
    historyRepository: ReturnType<historyDbInterface>
) => {
    try {
        const result = await historyRepository.getHistoryById(id);
        if (!result) {
            throw new AppError("history not found", HttpStatus.BAD_REQUEST);
        }
        return result;
    } catch (error: any) {
        console.log(error)
        throw new Error("Failed to get history")
    }
}

export const findAllHistorys = async (
    historyRepository: ReturnType<historyDbInterface>
) => {
    try {
        const results = await historyRepository.getAllHistorys();
        if (!results) {
            throw new AppError("not found", HttpStatus.BAD_REQUEST);
        }
        return results;
    } catch (error: any) {
        console.log(error)
        throw new Error("Failed to get history")
    }
}

export const updatedHistory = (
    id: string,
    updates: Partial<historyInterface>,
    historyRepository: ReturnType<historyDbInterface>
) => {
    try {
        const history = historyRepository.updateHistory(id, updates);
        if (!history) {
            throw new AppError('No history updates', HttpStatus.UNAUTHORIZED)
        }
        return history;
    } catch (error: any) {
        throw new Error(`error while updating the history ${error.message}`);
    }
}

export const createHistory = (
    history: historyInterface,
    historyRepository: ReturnType<historyDbInterface>
)=>{
    try {
        const newHistory = historyRepository.createHistory(history);
        if (!newHistory) {
            throw new AppError('failed to create history', HttpStatus.UNAUTHORIZED)
        }
        return newHistory;
    } catch (error: any) {
        throw new Error(`error while create the history ${error.message}`);
    }
}