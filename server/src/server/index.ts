import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from "express";
import Logger from '../common/Logger';
import { default as nectarSettings, default as NectarSettings } from '../database/nectarSettings';
import HttpRouter from './router';

export default class Server {

    private app: any;
    private readonly SERVER_STARTED = 'Example server started on port: ';
    private _nectar: nectarSettings;

    constructor(port: number) {
        this._nectar = new NectarSettings();
        this.app = express();
        this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

            next();
        });
        this.app.use(cors())
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(express.static(__dirname + '/public'));
        this.start(port);
    }

    public start(port: number): void {
        this.app.use((req, res, next) => {
            return next();
        })
        this.app.use(new HttpRouter());
        this.app.listen(port, () => {
            Logger.imp(this.SERVER_STARTED + port);
        });
    }
}