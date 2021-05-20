import VehicleEntity from "../../entity/Vehicle";

export default interface IVehicleController{
    get_list():Promise<VehicleEntity[]>;
    edit(params:{}):Promise<boolean|VehicleEntity>;
    create(params:{}):Promise<boolean|VehicleEntity>;
    remove(id:string):Promise<boolean>;
}