import { Router } from 'express';
import HomeController from './HomeController';

export default class Pages {
    router;
    constructor() {
        this.router = Router();

        this.router.get('/home', HomeController.index);

        return this.router;
    }
}