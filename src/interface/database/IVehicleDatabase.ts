import VehicleEntity from "../../entity/Vehicle";

export default interface IVehicleDatabase {
    get_all():Promise<VehicleEntity[]>;
    edit(element:VehicleEntity):Promise<VehicleEntity|boolean>;
    create(element:VehicleEntity):Promise<VehicleEntity|boolean>;
    remove(id:string):Promise<boolean>;
}