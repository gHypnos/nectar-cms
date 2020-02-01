import { Router } from 'express';
import banned from '../middleware/banned';
import Characters from './characters';
import Client from './client';

export default class Session {
    router;
    constructor() {
        this.router = Router();

        this.router.get('/client', banned, Client.index);
        this.router.post('/characters/switch', Characters.switch)
        this.router.post('/characters/create', banned, Characters.create)

        return this.router;
    }
}