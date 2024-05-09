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
    route.get('/account-data/email/:email', controller.getAccountByEmail);
    route.get('/account-data/role/:role',   controller.getAccountByRole);
    route.get('/account-data/id', authenticationMiddleware,  controller.getAccountData);
    route.get('/id/:id',  controller.getAccountById);
    route.get('/all-accounts', authenticationMiddleware,  controller.getAllAccount);
    route.put('/update-account',  controller.updateAccount);
    route.delete('/delete-account/:id', authenticationMiddleware,  controller.deleteAccountById);
    route.put('/forgot-password',  controller.forgot_password);
    return route;
}

export default accountRoute;