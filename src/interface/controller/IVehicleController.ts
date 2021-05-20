import VehicleEntity from "../../entity/Vehicle";

export default interface IVehicleController{
    get_list():Promise<Array<VehicleEntity>>;
    edit(params:{}):Promise<boolean|string>;
    create(params:{}):Promise<boolean|string>;
    remove(id:string):Promise<boolean>;
}