import { Application } from "express";
import authenticationMiddleware from "../middleware/authenticationMiddleware";
import employerRoute from "./employer";
import consolidationRoute from "./consolidation";
import transactionRoute from "./transaction";
import orderRoute from "./order";
import employerAuthRoute from "./employerAuth";

const routes = (app: Application) => {
    app.use('/api/employer-auth',employerAuthRoute());
    app.use('/api/employer', employerRoute());
    app.use('/api/consolidation',consolidationRoute());
    app.use('/api/transaction',transactionRoute());
    app.use('/api/order',orderRoute());
    
}

export default routes;
    