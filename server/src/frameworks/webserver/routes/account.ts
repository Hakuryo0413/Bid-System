import express from "express";
import roleMiddleware from "../middleware/roleMiddleware";
import accountController from "../../../adapters/controllers/accountController";
import { accountDbRepository } from "../../../app/repositories/accountDbRepository";
import { accountRepositoryMongoDB } from "../../database/mongoDb/repositories/accountRepositoryMongoDB";
import { Account } from "../../database/mongoDb/models/accountModel";
import authenticationMiddleware from "../middleware/authenticationMiddleware";

const accountMiddleware = roleMiddleware('account');

const accountRoute = () => {
    const route = express.Router();

    const controller = accountController(
        accountDbRepository,
        accountRepositoryMongoDB,
        Account
    );
    route.get('/account-data/:email', authenticationMiddleware, accountMiddleware, controller.getAccountByEmail);
    route.get('/account-data/:role', authenticationMiddleware, accountMiddleware, controller.getAccountByRole);
    route.get('/account-data/:id', authenticationMiddleware, accountMiddleware, controller.getAccountById);
    route.get('/all-accounts', authenticationMiddleware, accountMiddleware, controller.getAllAccount);
    route.patch('/update-account/:id', authenticationMiddleware, accountMiddleware, controller.updateAccount);
    route.delete('/delete-account/:id', authenticationMiddleware, accountMiddleware, controller.deleteAccountById);

    return route;
}

export default accountRoute;