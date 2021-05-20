import {Request, Response, Router} from 'express';
import VehicleControllerInstance from '../definer';
import IVehicleController from '../interface/controller/IVehicleController';
import Joi = require('joi');
import * as bodyParser from 'body-parser';
// const bodyParser = require('body-parser');
class VehicleRoute{

    private controller:IVehicleController;

    urlencodedParser;
    constructor(){
        const jsonParser = bodyParser.json();
        this.urlencodedParser = bodyParser.urlencoded({ extended: false })
        if(!this.controller){
            this.controller = VehicleControllerInstance;
        }
    }

    public prepare(router:Router):Router{
        router.get('/vehicle/all', this.urlencodedParser, this.get_all.bind(this));
        router.post('/vehicle/', this.urlencodedParser, this.create.bind(this));
        router.patch('/vehicle/:id', this.urlencodedParser, this.edit.bind(this));
        router.delete('/vehicle/:id', this.urlencodedParser, this.remove.bind(this));
        // router.patch('/vehicle/:id', this.get_all.bind(this));
        return router;
    }

    private async create(req:Request, res:Response):Promise<Response> {
        const rules = Joi.object(
            {
                ano : Joi.number().required().min(1500).max(2021),
                chassi: Joi.string().required().min(5).max(17),
                renavam: Joi.string().required().min(9).max(11),
                marca: Joi.string().required().min(2),
                modelo: Joi.string().required().min(2),
                placa: Joi.string().required().min(7).max(7),
            }
        );

        const { error, value } = rules.validate(req.body);

        if(error){
            return res.status(401).json(error);
        } else {
            this.controller.create(value).then((ok) => {
                res.status(201).json(ok);
            }).catch((err) => {
                return res.status(405).json(err);
            })
        }
    }

    private async get_all(req:Request, res:Response):Promise<Response> {
        try{
            const {id} = req.params;
            const response = await this.controller.get_list()
            let code:number;
            response.length === 0 ? code = 204 : code = 200;
            return res.status(code).json(response);
        } catch (error) {
            return res.status(500);
        }
    }

    private async edit(req:Request, res:Response):Promise<Response> {
            const rules = Joi.object(
                {
                    ano : Joi.number().required().min(1500).max(2021),
                    chassi: Joi.string().required().min(5).max(17),
                    renavam: Joi.string().required().min(9).max(11),
                    marca: Joi.string().required().min(2),
                    modelo: Joi.string().required().min(2),
                    placa: Joi.string().required().min(7).max(7),
                }
            );

            const { id } = req.params;

            const { error, value } = rules.validate(req.body);

            if(error){
                return res.status(401).json(error);
            } else {
                value.id = id;
                this.controller.edit(value).then((ok) => {
                    res.status(201).json(ok);
                }).catch((err) => {
                    return res.status(405).json(err);
                })
            }
       
    }

    private async remove(req:Request, res:Response):Promise<Response> {
        try{
            const {id} = req.params;
            const response = await this.controller.remove(id);
            return res.status(200).json(response);
        } catch (error) {
            return res.status(500);
        }
    }

}

export default VehicleRoute;