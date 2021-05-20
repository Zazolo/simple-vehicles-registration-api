import { Router } from 'express';
import VehicleRoute from './routes/VehicleRoute';


let routes = Router();

routes = new VehicleRoute().prepare(routes);


export default routes;