import { Router } from 'express';
import HttpRoutes from './routes';
import Token from './routes/middleware/token';

export default class HttpRouter {
    router;
    constructor() {
        this.router = Router();

        this.router.use('/api', Token, new HttpRoutes);

        return this.router;
    }
}