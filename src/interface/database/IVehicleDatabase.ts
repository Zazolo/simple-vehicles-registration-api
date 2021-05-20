import VehicleEntity from "../../entity/Vehicle";

export default interface IVehicleDatabase {
    get_all():Promise<VehicleEntity[]>;
    edit(element:VehicleEntity):Promise<boolean|string>;
    create(element:VehicleEntity):Promise<boolean|string>;
    remove(id:string):Promise<boolean>;
    get_suggestion_list(brand?:string):Promise<string[]>
}