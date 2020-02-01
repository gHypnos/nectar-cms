import { Router } from 'express';
import HttpRoutes from './routes';

export default class HttpRouter {
    router;
    constructor() {
        this.router = Router();

        this.router.use('/api', new HttpRoutes);

        return this.router;
    }
}