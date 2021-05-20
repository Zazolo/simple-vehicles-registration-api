import VehicleEntity from "../entity/Vehicle";
import IVehicleDatabase from "../interface/database/IVehicleDatabase";
import knex from "./lib/knex/KNEX";
class VehicleDatabase implements IVehicleDatabase{

    private checkifexists(key, value, ignoreId?:string):Promise<string>{
        return new Promise((resolve, reject) => {
            knex('vehicle').select('*').where(key, value).first().then((result) => {
                if(!result){
                    resolve('ok');
                } else {
                    if(ignoreId !== undefined){
                        if(result.id === ignoreId){
                            resolve('ok')
                        } else {
                            resolve(key);
                        }
                    } else {
                        resolve(key);
                    }

                }
            });

        })
    }

    create(element: VehicleEntity): Promise<string | boolean> {
        return new Promise((resolve, reject) => {

            Promise.all([
                this.checkifexists('id', element.id),
                this.checkifexists('renavam', element.renavam),
                this.checkifexists('chassi', element.chassi),
                this.checkifexists('placa', element.placa)
            ]).then((oks)=>{
                oks.forEach((ok) => {
                    if(ok !== 'ok'){
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
                const response = [];
                value.forEach(element => {
                    const nEl = new VehicleEntity(element);
                    response.push(nEl);
                });
                resolve(response);
            });
        })
    }

    edit(element: VehicleEntity): Promise<string | boolean> {
        return new Promise((resolve, reject) => {

            Promise.all([
                this.checkifexists('renavam', element.renavam, element.id),
                this.checkifexists('chassi', element.chassi, element.id),
                this.checkifexists('placa', element.placa, element.id)
            ]).then((oks)=>{
                oks.forEach((ok) => {
                    if(ok !== 'ok'){
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