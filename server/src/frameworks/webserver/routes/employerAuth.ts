import express from "express";
import roleMiddleware from "../middleware/roleMiddleware";
import employerAuthController from "../../../adapters/controllers/employerAuthController";
import { employerDbRepository } from "../../../app/repositories/employerDbRepository";
import { employerRepositoryMongoDB } from "../../database/mongoDb/repositories/employerRepositoryMongoDB";
import { authService } from "../../services/authService";
import { authServiceInterface } from "../../../app/services/authServiceInterface";
import { Employer } from "../../database/mongoDb/models/employerModel";
import authenticationMiddleware from "../middleware/authenticationMiddleware";

const employerMiddleware = roleMiddleware('employer');

const employerAuthRoute = () => {
    const route = express.Router();

    const controller = employerAuthController(
        authServiceInterface,
        authService,
        employerDbRepository,
        employerRepositoryMongoDB,
        Employer,
    );

    route.post('/create',controller.accountCreate);
    route.post('/login',controller.loginAccount);
    return route;
}

export default employerAuthRoute;