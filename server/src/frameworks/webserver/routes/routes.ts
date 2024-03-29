import { Application } from "express";
import accountAuthRoute from "./accountAuth";
import accountRoute from "./account";


const routes = (app: Application) => {
    
    app.use('/api/account-auth',accountAuthRoute());
    app.use('/api/account',accountRoute());
}

export default routes;
    