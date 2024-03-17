import { Schema, model } from "mongoose";

const transactionSchema = new Schema({
    address: {
        type: String
    },
    consolidation: {
        type: String
    },
    manager: {
        type: String
    },
    quantity: {
        type: Number
    }
})

export const Transaction = model("Transaction", transactionSchema, "transactions")
export type TransactionModel = typeof Transaction;