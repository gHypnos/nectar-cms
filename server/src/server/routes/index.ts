import { Router } from 'express';
import Auth from './auth';
import Components from './components';
import SettingsController from './nectar/SettingsController';
import Session from './session';

export default class HttpRoutes {
    router;
    constructor() {
        this.router = Router();
        this.router.get('/settings', SettingsController.index);
        this.router.use('/components', new Components);
        this.router.use('/session', new Session);
        this.router.use('/authentication', new Auth);

        return this.router;
    }
}