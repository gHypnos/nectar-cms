import { Router } from 'express';
import LoginController from './auth/LoginController';

export default class HttpRoutes {
    router;
    constructor() {
        this.router = Router();

        this.router.post('/authentication/login', LoginController.index);

        return this.router;
    }
}