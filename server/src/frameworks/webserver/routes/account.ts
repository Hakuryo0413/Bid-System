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
    route.get('/account-data/email/:email', authenticationMiddleware, controller.getAccountByEmail);
    route.get('/account-data/role/:role', authenticationMiddleware,  controller.getAccountByRole);
    route.get('/account-data/id', authenticationMiddleware,  controller.getAccountById);
    route.get('/all-accounts', authenticationMiddleware,  controller.getAllAccount);
    route.put('/update-account/:id', authenticationMiddleware,  controller.updateAccount);
    route.delete('/delete-account/:id', authenticationMiddleware,  controller.deleteAccountById);

    return route;
}

export default accountRoute;