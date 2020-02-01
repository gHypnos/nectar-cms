import { Router } from 'express';
import * as jwt from "jsonwebtoken";
import { Config } from '../../../config';
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
        this.router.use('/session', new Session, (req, res, next) => {
            var token = req.headers.authorization;
            if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

            jwt.verify(token, Config.jwtSecret, function (err, decoded) {
                if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            });
            next();
        });
        this.router.use('/authentication', new Auth, (req, res, next) => {

            next();
        });

        return this.router;
    }
}