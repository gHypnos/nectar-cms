import { Router } from 'express';
import Client from './client';

export default class Session {
    router;
    constructor() {
        this.router = Router();

        this.router.get('/client', Client.index);

        return this.router;
    }
}