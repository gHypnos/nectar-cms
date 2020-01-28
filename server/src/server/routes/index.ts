import { Router } from 'express';
import * as jwt from "jsonwebtoken";
import * as config from '../../../config.json';
import CheckController from './auth/CheckController';
import ClientController from './auth/ClientController';
import LoginController from './auth/LoginController';
import SettingsController from './nectar/SettingsController';
import Pages from './pages';

export default class HttpRoutes {
    router;
    constructor() {
        this.router = Router();
        this.router.get('/settings', SettingsController.index);
        this.router.use('/page', new Pages, (req, res, next) => {
            var token = req.headers.authorization;
            if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

            jwt.verify(token, config.jwtSecret, function (err, decoded) {
                if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            });
            next();
        });
        this.router.post('/authentication/login', LoginController.index);
        this.router.get('/authentication/Client', ClientController.index);
        this.router.get('/authentication/check', CheckController.index);

        return this.router;
    }
}