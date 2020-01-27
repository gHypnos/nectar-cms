import { Router } from 'express';
import * as jwt from "jsonwebtoken";
import * as config from '../../../config.json';
import LoginController from './auth/LoginController';
import Pages from './pages';

export default class HttpRoutes {
    router;
    constructor() {
        this.router = Router();

        this.router.use('/page', new Pages, (req, res, next) => {
            var token = req.headers.authorization;
            if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

            jwt.verify(token, config.jwtSecret, function (err, decoded) {
                if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            });
            next();
        });
        this.router.post('/authentication/login', LoginController.index);

        return this.router;
    }
}