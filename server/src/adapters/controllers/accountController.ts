import expressAsyncHandler from "express-async-handler";
import { accountDbInterface } from "../../app/repositories/accountDbRepository";
import { accountModel } from "../../frameworks/database/mongoDb/models/accountModel";
import { accountRepositoryMongoDB } from "../../frameworks/database/mongoDb/repositories/accountRepositoryMongoDB";
import { deleteAccount, findAccountByEmail, findAccountById, findAccountByRole, findAllAccounts, updatedAccount } from "../../app/useCases/account/account";
import { Request, Response } from "express";
import { CustomRequest } from "../../types/expressRequest";
import { accountInterface } from "../../types/accountInterface";
import AppError from "../../utils/appError";
import { HttpStatus } from "../../types/httpStatus";


export const accountController = (
    accountDbRepository: accountDbInterface,
    accountDbRepositoryImpl: accountRepositoryMongoDB,
    accountModel: accountModel
) => {
    const dbRepositoryAccount = accountDbRepository(accountDbRepositoryImpl(accountModel));

    const getAccountByEmail = expressAsyncHandler(
        async (req: Request, res: Response) => {
            const { email } = req.params;
            const account = await findAccountByEmail(email, dbRepositoryAccount);
            res.json(account);
        }
    );

    const getAccountByRole = expressAsyncHandler(
        async (req: Request, res: Response) => {
            const {role} = req.params;
            const account = await findAccountByRole(role,dbRepositoryAccount);
            res.json(account);
        }
    );

    const getAccountById = expressAsyncHandler(
        async (req: Request, res: Response) => {
            const customReq = req as CustomRequest;
            const id = customReq.payload ?? "";
            const account = await findAccountById(id, dbRepositoryAccount);
            res.json(account);
        }
    );

    const getAllAccount = expressAsyncHandler(
        async (req: Request, res: Response) => {
            const account = await findAllAccounts(dbRepositoryAccount);
            res.json(account);
        }
    );

    const updateAccount = expressAsyncHandler(
        async (req: Request, res: Response) => {
          const accountId = req.body;
          console.log(accountId)
          if (!accountId) {
            throw new AppError(
              "unauthorized request, invalid token",
              HttpStatus.UNAUTHORIZED
            );
          }
          const updates: accountInterface = req.body;
          const updateAccountData = await updatedAccount(
            accountId,
            updates,
            dbRepositoryAccount
          );
    
          res.json({
            status: "success",
            updateAccountData,
          });
        }
    );

    const deleteAccountById = expressAsyncHandler(
        async (req: Request, res: Response) => {
            const id = req.params.id;
            await deleteAccount(id, dbRepositoryAccount);
            res.json({
                status: "success",
                message: "account deleted successfully"
            });
        }
    );

    return{
        getAccountByEmail,
        getAccountByRole,
        getAllAccount,
        getAccountById,
        updateAccount,
        deleteAccountById
    }
}

export default accountController;