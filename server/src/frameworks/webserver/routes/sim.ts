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
    route.get('/sim-data/email/:email', controller.getSimByProvider);
    route.get('/sim-data/id', controller.getSimById);
    route.get('/sim-data/number/:number',  controller.getSimByNumber);
    route.get('/all-sims',  controller.getAllSim);
    route.put('/update-sim',  controller.updateSim);
    route.post('/create',  controller.simCreate);
    route.delete('/delete/id/:id',controller.deleteSimById);
    route.delete('/delete/number/:number',controller.deleteSimByNumber);
    return route;
}

export default simRoute;