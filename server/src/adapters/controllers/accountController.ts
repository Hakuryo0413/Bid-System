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

                account.password = await authServices.encryptPassword(account.password ?? "");

                if (account._id) {
                    const updateAccountData = await updatedAccount(
                        id,
                        account,
                        dbRepositoryAccount
                    );

                }
            }


        }
    )

    // const forgot_password = async (req, res) => {
    //     try {
    //         if (!check_required_field(req.body, ["email"])) {
    //             logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
    //             return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
    //         }

    //         const role = await this.model.findOne({
    //             where: { email: email },
    //         });

    //         if (!role) {
    //             // logger.warn(`${statusCode.HTTP_404_NOT_FOUND} Không tìm thấy người dùng`);
    //             return res.status(404).json("Không tìm thấy người dùng")
    //         }

    //         // const new_password = random_password();
    //         // let { success, hashedPassword } = await hash_password(new_password);
    //         if (!success) {
    //             return res.status(406).json("Lỗi")
    //         }
    //         role.password = hashedPassword;
    //         await role.save();

    //         await send_email(
    //             'ntdat12a03@gmail.com',
    //             role.email,
    //             `password = ${new_password}`,
    //             "QUEN MAT KHAU",
    //         )

    //         return res.status(statusCode.HTTP_205_RESET_CONTENT);
    //     } catch (error) {
    //         logger.error(`Forgot password error: ${error}`)
    //         return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
    //     }
    // }

    return {
        getAccountByEmail,
        getAccountByRole,
        getAllAccount,
        getAccountById,
        updateAccount,
        deleteAccountById,
        getAccountData
    }
}

export default accountController;