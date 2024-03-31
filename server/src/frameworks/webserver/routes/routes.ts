import { Application } from "express";
import accountAuthRoute from "./accountAuth";
import accountRoute from "./account";
import historyRoute from "./history";
import notificationRoute from "./notification";
import roomRoute from "./room";
import simRoute from "./sim";


const routes = (app: Application) => {
    
    app.use('/api/account-auth',accountAuthRoute());
    app.use('/api/account',accountRoute());
    app.use('/api/history',historyRoute());
    app.use('/api/notification',notificationRoute());
    app.use('/api/room',roomRoute());
    app.use('/api/sim',simRoute());
}

export default routes;
    