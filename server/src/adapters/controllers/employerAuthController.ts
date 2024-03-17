import expressAsyncHandler from "express-async-handler";
import { employerDbInterface } from "../../app/repositories/employerDbRepository";
import { AuthServiceInterface, authServiceInterface } from "../../app/services/authServiceInterface";
import { createAccount, loginAction } from "../../app/useCases/auth/employerAuth";
import { EmployerModel } from "../../frameworks/database/mongoDb/models/employerModel";
import { employerRepositoryMongoDB } from "../../frameworks/database/mongoDb/repositories/employerRepositoryMongoDB";
import { AuthService } from "../../frameworks/services/authService";
import { employerInterface } from "../../types/employerInterface";
import { Request, Response } from "express";

export const employerAuthController = (
    authServiceInterface: AuthServiceInterface,
    authServiceImpl: AuthService,
    employerDbRepository: employerDbInterface,
    employerDbRepositoryImpl: employerRepositoryMongoDB,
    employerModel: EmployerModel
) => {
    const dbRepositoryEmployer = employerDbRepository(employerDbRepositoryImpl(employerModel));
    const authService = authServiceInterface(authServiceImpl());

    const accountCreate = expressAsyncHandler(
        async (req: Request, res: Response) => {
            const employer: employerInterface = req?.body;
            await createAccount(employer, dbRepositoryEmployer, authService);
            res.json({
                status: "success",
                message: "account created successfully",
            });
        }
    );

    const loginAccount = expressAsyncHandler(
        async (req: Request, res: Response) => {
            const { username, password }: { username: string; password: string } = req.body;
            const token = await loginAction(username, password, dbRepositoryEmployer, authService);
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

export default employerAuthController;