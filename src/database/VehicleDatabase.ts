import VehicleEntity from "../entity/Vehicle";
import IVehicleDatabase from "../interface/database/IVehicleDatabase";
import knex from "./lib/knex/KNEX";
class VehicleDatabase implements IVehicleDatabase{

    private checkIfExists(key, value, ignore_id?:string):Promise<string>{
        return new Promise((resolve, reject) => {
            knex('vehicle').select('*').where(key, value).first().then((result) => {
                if(!result){
                    resolve('ok');
                } else {
                    if(ignore_id != undefined){
                        if(result.id == ignore_id){
                            console.log('IGNOROU O ID: ', ignore_id);
                            resolve('ok')
                        } else {
                            resolve(key);
                        }
                    } else {
                        console.log('coloquei a chave: ', key)
                        resolve(key);
                    }
                    
                }
            });

        })
    }

    create(element: VehicleEntity): Promise<string | boolean> {
        return new Promise((resolve, reject) => {

            Promise.all([
                this.checkIfExists('id', element.id),
                this.checkIfExists('renavam', element.renavam),
                this.checkIfExists('chassi', element.chassi),
                this.checkIfExists('placa', element.placa)
            ]).then((oks)=>{
                console.log(oks)
                oks.forEach((ok) => {
                    if(ok != 'ok'){
                        reject(`${ok.toUpperCase()} já existe no banco de dados!`)
                        return;
                    }
                })
            })

            knex('vehicle').insert(
                {
                    id: element.id,
                    ano:element.ano,
                    chassi: element.chassi,
                    modelo: element.modelo,
                    marca: element.marca,
                    renavam: element.renavam,
                    placa: element.placa
                }
            ).then((r) => {
                resolve(true);
            }).catch((err)=>{
                reject(err);
            })
        })
        
    }
    get_all(): Promise<VehicleEntity[]> {
        return new Promise((resolve, reject) => {
            knex('vehicle').select('*').then((value) => {
                console.log(value);
                let response = [];
                value.forEach(element => {
                    let nEl = new VehicleEntity(element);
                    response.push(nEl);
                });
                resolve(response);
            });
        })
    }

    edit(element: VehicleEntity): Promise<string | boolean> {
        return new Promise((resolve, reject) => {

            Promise.all([
                this.checkIfExists('renavam', element.renavam, element.id),
                this.checkIfExists('chassi', element.chassi, element.id),
                this.checkIfExists('placa', element.placa, element.id)
            ]).then((oks)=>{
                console.log(oks);
                oks.forEach((ok) => {
                    if(ok != 'ok'){
                        reject(`${ok.toUpperCase()} já existe no banco de dados!`)
                        return;
                    }
                })

               
            });

            
            knex('vehicle').update(
                {
                    ano:element.ano,
                    chassi: element.chassi,
                    modelo: element.modelo,
                    marca: element.marca,
                    renavam: element.renavam,
                    placa: element.placa
                }
            ).where(
                {
                    id: element.id
                }
            ).then((r) => {
                resolve(true);
            }).catch((err)=>{
                console.log('Erro aqui!');
                reject(err);
            })

            
        })
        
    
    }
    
    remove(id: string): Promise<boolean> {
        return knex('vehicle').where('id', id).del();
    }
    get_suggestion_list(brand?: string): Promise<string[]> {
        throw new Error("Method not implemented.");
    }

}

export default VehicleDatabase;