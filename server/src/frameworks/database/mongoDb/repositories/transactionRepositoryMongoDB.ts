import { type } from "os";
import { TransactionEntity } from "../../../../entities/TransactionEntity";
import { TransactionModel } from "../models/transactionModel";
import { transactionInterface } from "../../../../types/transactionInterface";

export const transactionRepositoryMongoDB = (model: TransactionModel) => {
    const transactionEntity = new TransactionEntity(model);

    const getTransactionByAddress = async (address: string, consolidation: string) => {
        const transaction = transactionEntity.getTransactionByAddress(address, consolidation);
        return transaction;
    }
    const getTransactionByID = async (id: string) => {
        const transaction = transactionEntity.getTransactionByID(id);
        return transaction;
    }
    const getTransactionsByConsolidation = async (consolidation: string) => {
        const transactions = transactionEntity.getTransactionsByConsolidation(consolidation);
        return transactions;
    }
    const getAllTransactions = async () => {
        const transactions = transactionEntity.getAllTransactions();
        return transactions;
    }

    const updateTheTransaction = async (transactionID: string, updates: Partial<transactionInterface>) =>{
        const transaction = await transactionEntity.updateTheTransaction(transactionID,updates);
        return transaction;
    }

    return {
        getTransactionByAddress,
        getTransactionByID,
        getTransactionsByConsolidation,
        getAllTransactions,
        updateTheTransaction
    }
}

export type transactionRepositoryMongoDB = typeof transactionRepositoryMongoDB;