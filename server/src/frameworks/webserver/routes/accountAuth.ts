import express from "express";
import roleMiddleware from "../middleware/roleMiddleware";
import accountAuthController from "../../../adapters/controllers/accountAuthController";
import { accountDbRepository } from "../../../app/repositories/accountDbRepository";
import { accountRepositoryMongoDB } from "../../database/mongoDb/repositories/accountRepositoryMongoDB";
import { authService } from "../../services/authService";
import { authServiceInterface } from "../../../app/services/authServiceInterface";
import { Account } from "../../database/mongoDb/models/accountModel";
import authenticationMiddleware from "../middleware/authenticationMiddleware";

const accountMiddleware = roleMiddleware('account');

const accountAuthRoute = () => {
    const route = express.Router();

    const controller = accountAuthController(
        authServiceInterface,
        authService,
        accountDbRepository,
        accountRepositoryMongoDB,
        Account,
    );

    route.post('/create', controller.accountCreate);
    route.post('/login', controller.loginAccount);
    return route;
}

export default accountAuthRoute;