import expressAsyncHandler from "express-async-handler";
import { accountDbInterface } from "../../app/repositories/accountDbRepository";
import { AuthServiceInterface, authServiceInterface } from "../../app/services/authServiceInterface";
import { createAccount, loginAction } from "../../app/useCases/auth/accountAuth";
import { accountModel } from "../../frameworks/database/mongoDb/models/accountModel";
import { accountRepositoryMongoDB } from "../../frameworks/database/mongoDb/repositories/accountRepositoryMongoDB";
import { AuthService } from "../../frameworks/services/authService";
import { accountInterface } from "../../types/accountInterface";
import { Request, Response } from "express";

export const accountAuthController = (
    authServiceInterface: AuthServiceInterface,
    authServiceImpl: AuthService,
    accountDbRepository: accountDbInterface,
    accountDbRepositoryImpl: accountRepositoryMongoDB,
    accountModel: accountModel
) => {
    const dbRepositoryAccount = accountDbRepository(accountDbRepositoryImpl(accountModel));
    const authService = authServiceInterface(authServiceImpl());

    const accountCreate = expressAsyncHandler(
        async (req: Request, res: Response) => {
            const account: accountInterface = req?.body;
            const token = await createAccount(account, dbRepositoryAccount, authService);
            res.json({
                status: "success",
                message: "account created successfully",
                token
            });
        }
    );

    const loginAccount = expressAsyncHandler(
        async (req: Request, res: Response) => {
            const { username, password }: { username: string; password: string } = req.body;
            const token = await loginAction(username, password, dbRepositoryAccount, authService);
            res.json({
                status: "success",
                message: "account verified",
                token
            })
        }
    )
    return {
        accountCreate,
        loginAccount
    };
}

export default accountAuthController;