import IVehicle from 'interface/models/IVehicleEntity';
import VehicleEntity from '../entity/Vehicle';
import IVehicleController from '../interface/controller/IVehicleController';
import IVehicleDatabase from '../interface/database/IVehicleDatabase';


class VehicleController implements IVehicleController{

    private database:IVehicleDatabase;

    constructor(database:IVehicleDatabase){
        this.database = database;
    }
    
    public async get_list():Promise<VehicleEntity[]>{
        return await this.database.get_all();
    }

    public async edit(params:{}):Promise<boolean|string>{
        console.log(params);
        return await true;//this.database.edit(vehicle);
    }

    public async create(params:IVehicle):Promise<boolean|string>{
        try {
            let newVehicle = new VehicleEntity(params);
            console.log(newVehicle);
            return await this.database.create(newVehicle);
        } catch (error) {
            return error;
        }        
    }

    public async remove(id:string):Promise<boolean>{
        return await this.database.remove(id);
    }


}

export default VehicleController;