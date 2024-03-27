import { type } from "os";
import { historyRepositoryMongoDB } from "../../frameworks/database/mongoDb/repositories/historyRepositoryMongoDB";
import { historyInterface } from "../../types/historyInterface";

export const historyDbRepository = (
    repository: ReturnType<historyRepositoryMongoDB>
) => {
    const getHistoryByAccount = async (email: string) => {
        const history = await repository.getHistoryByAccount(email);
        return history;
    }

    const getHistoryById = async (id: string) => {
        const history = await repository.getHistoryById(id);
        return history;
    }

    const getAllHistorys = async () => {
        const historys = await repository.getAllHistory();
        return historys;
    }
    const createHistory = async (history: historyInterface) => {
        const newHistory = await repository.createHistory(history);
        return newHistory;
    }

    const updateHistory = async (id: string, updates: Partial<historyInterface>) => {
        const updatedHistory = await repository.updateHistory(id, updates);
        return updatedHistory;
    }


    return {
        getHistoryByAccount,
        getHistoryById,
        getAllHistorys,
        createHistory,
        updateHistory
    }
}

export type historyDbInterface = typeof historyDbRepository;