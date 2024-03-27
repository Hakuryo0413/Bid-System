import { type } from "os";
import { accountRepositoryMongoDB } from "../../frameworks/database/mongoDb/repositories/accountRepositoryMongoDB";
import { accountInterface } from "../../types/accountInterface";

export const accountDbRepository = (
    repository: ReturnType<accountRepositoryMongoDB>
) => {
    const getAccountByEmail = async (email: string) => {
        const account = await repository.getAccountByEmail(email);
        return account;
    }

    const getAccountByRole = async (role: string) => {
        const accounts = await repository.getAccountByRole(role);
        return accounts;
    }

    const getAccountById = async (id: string) => {
        const account = await repository.getAccountById(id);
        return account;
    }

    const getAllAccounts = async () => {
        const accounts = await repository.getAllAccount();
        return accounts;
    }
    const createAccount = async (account: accountInterface) => {
        const newAccount = await repository.createAccount(account);
        return newAccount;
    }

    const updateAccount = async (id: string, updates: Partial<accountInterface>) => {
        const updatedAccount = await repository.updateAccount(id, updates);
        return updatedAccount;
    }

    const deleteAccount = async (id: string) => {
        await repository.deleteAccount(id);
    }

    return {
        getAccountByEmail,
        getAccountById,
        getAllAccounts,
        createAccount,
        getAccountByRole,
        updateAccount,
        deleteAccount
    }
}

export type accountDbInterface = typeof accountDbRepository;