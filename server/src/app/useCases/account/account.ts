import { accountInterface } from "../../../types/accountInterface";
import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";
import { accountDbInterface } from "../../repositories/accountDbRepository";

export const findAccountByEmail = async (
    email: string,
    accountRepository: ReturnType<accountDbInterface>
) => {
    try {
        const result = await accountRepository.getAccountByEmail(email);
        if (!result) {
            throw new AppError("account not found", HttpStatus.BAD_REQUEST);
        }
        return result;
    } catch (error: any) {
        console.log(error)
        throw new Error("Failed to find account")
    }
}

export const findAccountByRole = async (
    role: string,
    accountRepository: ReturnType<accountDbInterface>
) => {
    try {
        const results = await accountRepository.getAccountByRole(role);
        if (!results) {
            throw new AppError("not found", HttpStatus.BAD_REQUEST);
        }
        return results;
    } catch (error: any) {
        console.log(error)
        throw new Error("Failed to find account")
    }
}

export const findAccountById = async (
    id: string,
    accountRepository: ReturnType<accountDbInterface>
) => {
    try {
        const result = await accountRepository.getAccountById(id);
        if (!result) {
            throw new AppError("account not found", HttpStatus.BAD_REQUEST);
        }
        return result;
    } catch (error: any) {
        console.log(error)
        throw new Error("Failed to get account")
    }
}

export const findAllAccounts = async (
    accountRepository: ReturnType<accountDbInterface>
) => {
    try {
        const results = await accountRepository.getAllAccounts();
        if (!results) {
            throw new AppError("not found", HttpStatus.BAD_REQUEST);
        }
        return results;
    } catch (error: any) {
        console.log(error)
        throw new Error("Failed to get account")
    }
}

export const updatedAccount = (
    id: string,
    updates: Partial<accountInterface>,
    accountRepository: ReturnType<accountDbInterface>
) => {
    try {
        const account = accountRepository.updateAccount(id, updates);
        if (!account) {
            throw new AppError('No account updates', HttpStatus.UNAUTHORIZED)
        }
        return account;
    } catch (error: any) {
        throw new Error(`error while updating the account ${error.message}`);
    }
}

export const deleteAccount = async (
  id: string,
  accountRepository: ReturnType<accountDbInterface>
) => {
  try {
    await accountRepository.deleteAccount(id);
  } catch (error) {
    throw new Error("failed to delete the account");
  }
};