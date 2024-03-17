import expressAsyncHandler from "express-async-handler";
import { employerDbInterface } from "../../app/repositories/employerDbRepository";
import { EmployerModel } from "../../frameworks/database/mongoDb/models/employerModel";
import { employerRepositoryMongoDB } from "../../frameworks/database/mongoDb/repositories/employerRepositoryMongoDB";
import { Request, Response } from "express";
import { deleteEmployer, deleteEmployerById, findAllEmployers, findEmployerByConsolidation, findEmployerById, findEmployerByTransation, findEmployerByUsername } from "../../app/useCases/employer/employer";
import { CustomRequest } from "../../types/expressRequest";

export const employerController = (
    employerDbRepository: employerDbInterface,
    employerDbRepositoryImpl: employerRepositoryMongoDB,
    employerModel: EmployerModel
) => {
    const dbRepositoryEmployer = employerDbRepository(employerDbRepositoryImpl(employerModel));

    const getEmployerByUsername = expressAsyncHandler(
        async (req: Request, res: Response) => {
            const { username } = req.body;
            const employer = await findEmployerByUsername(username, dbRepositoryEmployer);
            res.json(employer);
        }
    )

    const getEmployerById = expressAsyncHandler(
        async (req: Request, res: Response) => {
            const customReq = req as CustomRequest;
            const id = customReq.payload ?? "";
            const employer = await findEmployerById(id, dbRepositoryEmployer);
            res.json(employer);
        }
    )
    const getEmployerByTransation = expressAsyncHandler(
        async (req: Request, res: Response) => {
            const { transaction } = req.params;
            const employer = await findEmployerByTransation(transaction, dbRepositoryEmployer);
            res.json(employer);
        }
    )
    const getEmployerByConsolidation = expressAsyncHandler(
        async (req: Request, res: Response) => {
            const { consolidation } = req.params;
            const employer = await findEmployerByConsolidation(consolidation, dbRepositoryEmployer);
            res.json(employer);
        }
    )
    const getAllEmployers = expressAsyncHandler(
        async (req: Request, res: Response) => {
            const allEmployers = await findAllEmployers(dbRepositoryEmployer);
            res.json({
                status: "success",
                allEmployers
            })
        }
    )

    const deleteTheEmployer = expressAsyncHandler(
        async (req: Request, res: Response) => {
            const { username } = req.params;
            console.log(username);
            await deleteEmployer(username, dbRepositoryEmployer);

            res.json({
                status: "success",
                message: "employer deleted successfully"
            });
        }
    )

    const deleteTheEmployerById = expressAsyncHandler(
        async (req: Request, res: Response) => {
            const customReq = req as CustomRequest;
            const id = customReq.payload ?? "";
            await deleteEmployerById(id, dbRepositoryEmployer);
            res.json({
                status: "success",
                message: "employer deleted successfully"
            });
        }
    )

    return{
        getEmployerByUsername,
        getEmployerById,
        getEmployerByTransation,
        getEmployerByConsolidation,
        getAllEmployers,
        deleteTheEmployer,
        deleteTheEmployerById
    }
}

export default employerController;
 