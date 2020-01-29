import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from "express";
import Logger from '../common/Logger';
import HttpRouter from './router';

export default class Server {

    private app: any;
    private readonly SERVER_STARTED = 'Nectar API started: ';
    private _logo: any

    constructor(port: number) {
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
        this._logo = `,---.   .--.    .-''-.      _______ ,---------.    ____    .-------.     \n`;
        this._logo += "|    \\  |  |  .'_ _   \\    /   __  \\\\          \\ .'  __ `. |  _ _   \\    \n";
        this._logo += "|  ,  \\ |  | / ( ` )   '  | ,_/  \\__)`--.  ,---'/   '  \\  \\| ( ' )  |    \n";
        this._logo += "|  |\\_ \\|  |. (_ o _)  |,-./  )         |   \\   |___|  /  ||(_ o _) /    \n";
        this._logo += "|  _( )_\\  ||  (_,_)___|\\  '_ '`)       :_ _:      _.-`   || (_,_).' __  \n";
        this._logo += "| (_ o _)  |'  \\   .---. > (_)  )  __   (_I_)   .'   _    ||  |\\ \\  |  | \n";
        this._logo += "|  (_,_)\\  | \\  `-'    /(  .  .-'_/  ) (_(=)_)  |  _( )_  ||  | \\ `'   / \n";
        this._logo += "|  |    |  |  \\       /  `-'`-'     /   (_I_)   \\ (_ o _) /|  |  \\    /  \n";
        this._logo += "'--'    '--'   `'-..-'     `._____.'    '---'    '.(_,_).' ''-'   `'-'   \n";
    }

    public start(port: number): void {
        this.app.use((req, res, next) => {
            return next();
        })
        this.app.use(new HttpRouter());
        this.app.listen(port, () => {
            console.log(this._logo)
            Logger.log(this.SERVER_STARTED + port);
        });
    }
}