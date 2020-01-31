import { Router } from 'express';
import Characters from './characters';
import Client from './client';

export default class Session {
    router;
    constructor() {
        this.router = Router();

        this.router.get('/client', Client.index);
        this.router.post('/characters/switch', Characters.switch)
        this.router.post('/characters/create', Characters.create)

        return this.router;
    }
}