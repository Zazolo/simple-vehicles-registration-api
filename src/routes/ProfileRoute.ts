import {Request, Response} from 'express';
import profileController from '../definer';
class ProfileRoute{
    
    private controller;

    constructor(){
        console.log("ProfileRoute started");
        if(!this.controller){
            console.log("ProfileController created in ProfileRoute");
            this.controller = profileController;
        }
    }

    public async get_one(req:Request, res:Response):Promise<Response> {
        try{
            const {id} = req.params;
            const response = await this.controller.get(id);
            return res.status(200).json(response);
        } catch (error) {
            console.log(error);
            return res.status(403);
        }
    }

}

export default new ProfileRoute()