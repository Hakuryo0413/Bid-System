import { accountEntity } from "../../../../entities/accountEntity";
import { accountModel } from "../models/accountModel";
import { accountInterface } from "../../../../types/accountInterface";

export const accountRepositoryMongoDB = (model: accountModel) =>{
    const AccountEntity = new accountEntity(model);
    
    const getAccountById = async (id: string) =>{
        const account = await AccountEntity.getAccountById(id);
        return account;
    }

    const getAccountByEmail = async (email: string) =>{
        const account = await AccountEntity.getAccountByEmail(email);
        return account;
    }

    const createAccount = async (account : accountInterface) =>{
        const newAccount = await AccountEntity.createAccount(account);
        return newAccount;
    }

    const updateAccount = async (id: string, updates: Partial<accountInterface>) =>{
        const updatedAccount = await AccountEntity.updateAccount(id,updates);
        return updatedAccount;
    }

    const getAllAccount = async() =>{
        const allAccounts = await AccountEntity.getAllAccount();
        return allAccounts;
    }

    return{
        getAccountById,
        getAccountByEmail,
        createAccount,
        updateAccount,
        getAllAccount
    }
}

export type accountRepositoryMongoDB = typeof accountRepositoryMongoDB;