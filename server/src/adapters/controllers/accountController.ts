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
import { authService } from "../../frameworks/services/authService";
import { authServiceInterface } from "../../app/services/authServiceInterface";
import { emailService } from "../../frameworks/services/emailService";
import configKeys from "../../config";

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
            const { role } = req.params;
            const account = await findAccountByRole(role, dbRepositoryAccount);
            res.json(account);
        }
    );

    const getAccountById = expressAsyncHandler(
        async (req: Request, res: Response) => {
            const id = req.params.id;
            const account = await findAccountById(id, dbRepositoryAccount);
            res.json(account);
        }
    );

    const getAccountData = expressAsyncHandler(
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

    const forgot_password = expressAsyncHandler(
        async (req: Request, res: Response) => {
            const email = req.body.email;

            const account = await findAccountByEmail(email, dbRepositoryAccount);
            if (account._id) {
                const id = account._id.toString();
                const authServices = authServiceInterface(authService());

                const password =  "Abc123" //authServices.randomPassword();
                account.password = await authServices.encryptPassword(password ?? "");

                if (account._id) {
                    await updatedAccount(
                        id,
                        account,
                        dbRepositoryAccount
                    );
                }

                if (account.email) {
                    await emailService().send_email(
                        configKeys.EMAIL_USER,
                        account.email,
                        `password = ${password}`,
                        "QUEN MAT KHAU",
                    )
                }
            }

            res.json({
                status: "success",
                message: "Reset pass successfully"
            });
        }
    )
    const reset_password = expressAsyncHandler(
        async (req: Request, res: Response) => {
            const email = req.body.email;
            const password = req.body.password;
            const account = await findAccountByEmail(email, dbRepositoryAccount);
            if (account._id) {
                const id = account._id.toString();
                const authServices = authServiceInterface(authService());

                //authServices.randomPassword();
                account.password = await authServices.encryptPassword(password ?? "");

                if (account._id) {
                    await updatedAccount(
                        id,
                        account,
                        dbRepositoryAccount
                    );
                }

                
            }

            res.json({
                status: "success",
                message: "Reset pass successfully"
            });
        }
    )

    return {
        getAccountByEmail,
        getAccountByRole,
        getAllAccount,
        getAccountById,
        updateAccount,
        deleteAccountById,
        getAccountData,
        forgot_password,
        reset_password
    }
}

export default accountController;