import expressAsyncHandler from "express-async-handler";
import { simDbInterface } from "../../app/repositories/simDbRepository";
import { simModel } from "../../frameworks/database/mongoDb/models/simModel";
import { simRepositoryMongoDB } from "../../frameworks/database/mongoDb/repositories/simRepositoryMongoDB";
import { CustomRequest } from "../../types/expressRequest";
import { createSim, deleteSim, deleteTheSimByNumber, findAllSims, findSimById, findSimByNumber, findSimByProvider, updatedSim } from "../../app/useCases/sim/sim";
import { Request, Response } from "express";
import { simInterface } from "../../types/simInterface";
import AppError from "../../utils/appError";
import { HttpStatus } from "../../types/httpStatus";

export const simController = (
    simDbRepository: simDbInterface,
    simDbRepositoryImpl: simRepositoryMongoDB,
    simModel: simModel
) => {
    const dbRepositorySim = simDbRepository(simDbRepositoryImpl(simModel));

    const getSimByNumber = expressAsyncHandler(
        async (req: Request, res: Response) => {
            const { number } = req.params;
            const sims = await findSimByNumber(number, dbRepositorySim);
            res.json(sims);
        }
    );

    const getSimByProvider = expressAsyncHandler(
        async (req: Request, res: Response) => {
            const { email } = req.params;
            const sims = await findSimByProvider(email, dbRepositorySim);
            res.json(sims);
        }
    );

    const getSimById = expressAsyncHandler(
        async (req: Request, res: Response) => {
            const id = req.params.id;
            const sims = await findSimById(id, dbRepositorySim);
            res.json(sims);
        }
    )

    const getAllSim = expressAsyncHandler(
        async (req: Request, res: Response) => {
            const sims = await findAllSims(dbRepositorySim);
            res.json(sims);
        }
    )



    const simCreate = expressAsyncHandler(
        async (req: Request, res: Response) => {
            const sim: simInterface = req?.body;
            const token = await createSim(sim, dbRepositorySim);
            res.json({
                status: "success",
                message: "sim created successfully",
                token
            });
        }
    )

    const updateSim = expressAsyncHandler(
        async (req: Request, res: Response) => {
          const simId = req.params.id;
          if (!simId) {
            throw new AppError(
              "unauthorized request, invalid token",
              HttpStatus.UNAUTHORIZED
            );
          }
          const updates: simInterface = req.body;
          const updateSimData = await updatedSim(
            simId,
            updates,
            dbRepositorySim
          );
    
          res.json({
            status: "success",
            updateSimData,
          });
        }
    ); 

    const deleteSimById = expressAsyncHandler(
        async (req: Request, res: Response) => {
            const id = req.params.id;
            await deleteSim(id, dbRepositorySim);
            res.json({
                status: "success",
                message: "provider deleted successfully"
            });
        }
    );

    const deleteSimByNumber = expressAsyncHandler(
        async (req: Request, res: Response) => {
            const {number} = req.params;
            await deleteTheSimByNumber(number, dbRepositorySim);
            res.json({
                status: "success",
                message: "provider deleted successfully"
            });
        }
    );

    return{
        getSimByNumber,
        getSimByProvider,
        getSimById,
        getAllSim,
        updateSim,
        simCreate,
        deleteSimById,
        deleteSimByNumber
    }
}

export default simController;
