import { historyEntity } from "../../../../entities/historyEntity";
import { historyModel } from "../models/historyModel";
import { historyInterface } from "../../../../types/historyInterface";

export const historyRepositoryMongoDB = (model: historyModel) =>{
    const HistoryEntity = new historyEntity(model);
    
    const getHistoryById = async (id: string) =>{
        const history = await HistoryEntity.getHistoryById(id);
        return history;
    }

    const getHistoryByEmail = async (email: string) =>{
        const history = await HistoryEntity.getHistoryByEmail(email);
        return history;
    }

    const createHistory = async (history : historyInterface) =>{
        const newHistory = await HistoryEntity.createHistory(history);
        return newHistory;
    }

    const updateHistory = async (id: string, updates: Partial<historyInterface>) =>{
        const updatedHistory = await HistoryEntity.updateHistory(id,updates);
        return updatedHistory;
    }

    const getAllHistory = async() =>{
        const allHistorys = await HistoryEntity.getAllHistory();
        return allHistorys;
    }

    return{
        getHistoryById,
        getHistoryByEmail,
        createHistory,
        updateHistory,
        getAllHistory
    }
}

export type historyRepositoryMongoDB = typeof historyRepositoryMongoDB;