import { v4 as uuidv4 } from 'uuid';
import IVehicle from '../interface/models/IVehicleEntity';

class VehicleEntity implements IVehicle{
    id:string;
    placa:string;
    chassi:string;
    renavam:string;
    modelo:string;
    marca:string;
    ano:number;
    constructor(properties: Omit<IVehicle, "id">, id?:string|number){
        if(!id){
            this.id = uuidv4();
        }
        Object.assign(this, properties);
    }
}

export default VehicleEntity;