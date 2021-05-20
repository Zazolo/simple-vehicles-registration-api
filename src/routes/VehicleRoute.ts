import {Request, Response, Router} from 'express';
import VehicleControllerInstance from '../definer';
import IVehicleController from '../interface/controller/IVehicleController';
import Joi = require('joi');
var bodyParser = require('body-parser');
class VehicleRoute{
    
    private controller:IVehicleController;

    urlencodedParser;
    constructor(){
        console.log("Vehicle started");
        var jsonParser = bodyParser.json();
        this.urlencodedParser = bodyParser.urlencoded({ extended: false })
        if(!this.controller){
            console.log("VehicleController created in VehicleRoute");
            this.controller = VehicleControllerInstance;
        }
    }

    public prepare(router:Router):Router{
        router.get('/vehicle/all', this.urlencodedParser, this.get_all.bind(this));
        router.post('/vehicle/', this.urlencodedParser, (req:Request, res:Response, next) => {
            return this.create(req, res);
            next();
        });
        //router.patch('/vehicle/:id', this.get_all.bind(this));
        return router;
    }

    private async create(req:Request, res:Response):Promise<Response> {
        try{
            let rules = Joi.object(
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
                const response = await this.controller.create(value);
                return res.status(201).json(response);
            }
        } catch (error) {
            console.log(error);
            return res.status(404); //se existir tem que retornar 409
        }
    }

    private async get_all(req:Request, res:Response):Promise<Response> {
        try{
            const {id} = req.params;
            const response = await this.controller.get_list()
            let code = 200;
            response.length == 0 ? code = 404 : code;
            return res.status(code).json(response);
        } catch (error) {
            console.log(error);
            return res.status(500);
        }
    }

    private async edit(req:Request, res:Response):Promise<Response> {
        try{
            const response = await this.controller.edit(req.body.params)
            return res.status(200).json(response);
        } catch (error) {
            console.log(error);
            return res.status(403);
        }
    }

    private async remove(req:Request, res:Response):Promise<Response> {
        try{
            const {id} = req.params;
            const response = await {}//this.controller.get(id);
            return res.status(200).json(response);
        } catch (error) {
            console.log(error);
            return res.status(403);
        }
    }

    private async suggestions(req:Request, res:Response):Promise<Response> {
        try{
            const {id} = req.params;
            const response = await {}//this.controller.get(id);
            return res.status(200).json(response);
        } catch (error) {
            console.log(error);
            return res.status(403);
        }
    }

}

export default VehicleRoute;