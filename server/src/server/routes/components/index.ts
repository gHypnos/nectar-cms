import { Router } from 'express';
import Banned from '../middleware/banned';
import Me from './me';
import News from './news';

export default class Components {
    router;
    constructor() {
        this.router = Router();

        this.router.get('/me', Banned, Me.index);
        this.router.get('/news', News.index);

        return this.router;
    }
}