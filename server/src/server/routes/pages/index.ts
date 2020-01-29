import { Router } from 'express';
import ClientController from '../auth/ClientController';
import HomeController from './HomeController';

export default class Pages {
    router;
    constructor() {
        this.router = Router();

        this.router.get('/home', HomeController.index);
        this.router.get('/client', ClientController.index);

        return this.router;
    }
}