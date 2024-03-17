import express from "express";
import roleMiddleware from "../middleware/roleMiddleware";
import employerController from "../../../adapters/controllers/employerController";
import { employerDbRepository } from "../../../app/repositories/employerDbRepository";
import { employerRepositoryMongoDB } from "../../database/mongoDb/repositories/employerRepositoryMongoDB";
import { Employer } from "../../database/mongoDb/models/employerModel";
import authenticationMiddleware from "../middleware/authenticationMiddleware";


const employerMiddleware = roleMiddleware('employer');

const employerRoute = () => {
    const route = express.Router();

    const controller = employerController(
        employerDbRepository,
        employerRepositoryMongoDB,
        Employer
    );
    route.get('/employer-data/username',authenticationMiddleware,employerMiddleware,controller.getEmployerByUsername);
    route.get('/employer-data/emp-id',authenticationMiddleware,employerMiddleware,controller.getEmployerById);
    route.get('/employer-data/transaction/:transaction',authenticationMiddleware,employerMiddleware,controller.getEmployerByTransation);
    route.get('/employer-data/consolidation/:consolidation',authenticationMiddleware,employerMiddleware,controller.getEmployerByConsolidation);
    route.get('/all-employers',authenticationMiddleware,employerMiddleware,controller.getAllEmployers);
    route.delete('/delete-employer/:username',authenticationMiddleware,employerMiddleware,controller.deleteTheEmployer);
    route.delete('/delete-employer/:id',authenticationMiddleware,employerMiddleware,controller.deleteTheEmployerById);

    return route;
}

export default employerRoute;