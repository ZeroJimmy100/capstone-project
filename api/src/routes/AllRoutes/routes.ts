import * as express from 'express';
import RegisterRoute from '../registerRoute';
import UpdateRoute from '../updateUserRoute';

const routes = express.Router();

routes.use('/register', RegisterRoute);
// routes.use('/update', UpdateRoute);

export = routes;