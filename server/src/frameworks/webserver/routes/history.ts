import express from "express";
import roleMiddleware from "../middleware/roleMiddleware";
import historyController from "../../../adapters/controllers/historyController";
import { historyDbRepository } from "../../../app/repositories/historyDbRepository";
import { historyRepositoryMongoDB } from "../../database/mongoDb/repositories/historyRepositoryMongoDB";
import { History } from "../../database/mongoDb/models/historyModel";
import authenticationMiddleware from "../middleware/authenticationMiddleware";

const historyRoute = () => {
  const route = express.Router();

  const controller = historyController(
    historyDbRepository,
    historyRepositoryMongoDB,
    History
  );
  route.get("/history-data/email/:email", controller.getHistoryByAccount);
  route.get("/history-data/id/:id", controller.getHistoryById);
  route.get("/all-historys", controller.getAllHistory);
  route.put("/update-history", controller.updateHistory);
  route.post("/create", controller.historyCreate);

  return route;
};

export default historyRoute;
