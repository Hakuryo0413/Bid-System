import express from "express";
import roleMiddleware from "../middleware/roleMiddleware";
import simController from "../../../adapters/controllers/simController";
import { simDbRepository } from "../../../app/repositories/simDbRepository";
import { simRepositoryMongoDB } from "../../database/mongoDb/repositories/simRepositoryMongoDB";
import { Sim } from "../../database/mongoDb/models/simModel";
import authenticationMiddleware from "../middleware/authenticationMiddleware";


const simRoute = () => {
    const route = express.Router();

    const controller = simController(
        simDbRepository,
        simRepositoryMongoDB,
        Sim
    );
    route.get('/sim-data/email/:email', authenticationMiddleware, controller.getSimByProvider);
    route.get('/sim-data/id', authenticationMiddleware, controller.getSimById);
    route.get('/sim-data/number/:number', authenticationMiddleware,  controller.getSimByNumber);
    route.get('/all-sims', authenticationMiddleware,  controller.getAllSim);
    route.patch('/update-sim/:id', authenticationMiddleware,  controller.updateSim);
    route.post('/create', authenticationMiddleware,  controller.simCreate);
    route.delete('/delete/id/:id',authenticationMiddleware,controller.deleteSimById);
    route.delete('/delete/number/:number',authenticationMiddleware,controller.deleteSimByNumber);
    return route;
}

export default simRoute;