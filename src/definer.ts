import VehicleController from './controllers/VehicleController';
import VehicleDatabase from './database/VehicleDatabase';

const VehicleControllerInstance = new VehicleController(new VehicleDatabase());

export default VehicleControllerInstance;