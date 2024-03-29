import * as express from 'express';
import * as cors from 'cors';
import routes from './routes';

class App {
    public express: express.Application

    public constructor(){
        this.express = express();
        this.middlewares();
        this.routes();
        console.log('Serviço iniciado.')
    }

    private middlewares():void{
        this.express.use(express.json());
        this.express.use(cors())
    }

    private routes():void{
        this.express.use(routes);
    }
}

export default new App().express